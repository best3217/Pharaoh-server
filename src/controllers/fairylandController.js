import { Types } from 'mongoose'
import { BettingHistories, GameSessions, Users } from '../models'
import { dataSave, fairylandError, getGameID, playerBalanceUpdate, playerLevelUp } from './baseController'

const LAUNCHURL = "1"

const errorResponse = (error) => {
	return {
		status: false,
		code: error,
		message: fairylandError(error)
	}
}

const successResponse = (data) => {
	return {
		status: true,
		code: 200,
		data: data
	}
}

const authenticateChild = async (req) => {
    const data = await GameSessions.findOne({token: req.token}).populate('users_id')
	if (!data) {
		return errorResponse("303")
	} else {
		const detailuser = data.users_id
		if (!detailuser) {
			return errorResponse("304")
		} else {
			var row = {}
			row['playerId'] = detailuser._id
			row['playerName'] = detailuser.username
			row['currency'] = "INR"
			row['balance'] = parseFloat(detailuser.gold).toFixed(2)
			row['token'] = req.token
			return successResponse(row)
		}
	}
}

const creditChild = async (req) => {
	const data = req.body
	const detailuser = await Users.findById(data.playerId)
	if (!detailuser) {
		return errorResponse("304")
	} else {
		const {games_id, providers_id} = await getGameID(LAUNCHURL, data.ID)
        const history = {
            users_id: Types.ObjectId(detailuser._id),
            providers_id: Types.ObjectId(providers_id),
            games_id: Types.ObjectId(games_id),
            amount: data.creditMoney,
            betting: {
                prevbalance: detailuser.gold,
                TransactionID: data.transactionID
            },
            type: "WIN"
        }
        const savehandle = await dataSave(history, BettingHistories)
        if (savehandle) {
            const goldHistory = {
                users_id: Types.ObjectId(detailuser._id),
                games_id: Types.ObjectId(games_id),
                credited: data.creditMoney,
                debited: 0,
                last_gold: detailuser.gold,
                status: "WIN",
            }
            const updatehandle = await playerBalanceUpdate(data.creditMoney, detailuser._id, goldHistory, req)
            if (updatehandle === false) {
                return errorResponse("304")
            } else {
                var row = {
                    'balance': parseFloat(updatehandle).toFixed(2),
                    'playerName': detailuser.username
                }
                return successResponse(row)
            }
        } else {
            return errorResponse("304")
        }
	}
}

const debitChild = async (req) => {
	const data = req.body
	const detailuser = await Users.findById(data.playerId)
	if (!detailuser) {
		return errorResponse("304")
	} else {
		if (data.debitMoney <= detailuser.gold) {
			const {games_id, providers_id} = await getGameID(LAUNCHURL, data.ID)
			const history = {
				users_id: Types.ObjectId(detailuser._id),
                providers_id: Types.ObjectId(providers_id),
                games_id: Types.ObjectId(games_id),
				amount: data.debitMoney,
				betting: {
                    prevbalance: detailuser.gold,
					TransactionID: data.transactionID
				},
                type: "BET"
			}
            const savehandle = await dataSave(history, BettingHistories)
			if (savehandle) {
				const goldHistory = {
					users_id: Types.ObjectId(detailuser._id),
					games_id: Types.ObjectId(games_id),
					credited: 0,
					debited: data.debitMoney,
					last_gold: detailuser.gold,
                    status: "BET",
				}
				const levelupdate = await playerLevelUp(detailuser._id, data.debitMoney, req)
				const updatehandle = await playerBalanceUpdate(data.debitMoney*-1, detailuser._id, goldHistory, req)
				if (updatehandle === false) {
					return errorResponse("304")
				} else {
					var row = {
						'balance': parseFloat(updatehandle).toFixed(2),
						'playerName': detailuser.username
					}
					return successResponse(row)
				}
			} else {
				return errorResponse("304")
			}
		} else {
			return errorResponse("305")
		}
	}
}

export const authenticate = async (req,res,next) => {
    const result = await authenticateChild(req.body)
	return res.json(result)
}

export const credit = async (req, res, next) => {
	const result = await creditChild(req)
	return res.json(result)
}

export const debit = async (req, res, next) => {
	const result = await debitChild(req)
	return res.json(result)
}