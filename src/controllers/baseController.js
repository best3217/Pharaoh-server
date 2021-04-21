import jwt from 'jsonwebtoken'
import md5 from 'md5'
import moment from 'moment-timezone'
import { GameHistories, GameLists, GameSessions, GoldHistories, Sessions, Users } from '../models'

export const getIPAddress = (req) => {
    const forwarded = req.headers['x-forwarded-for']
    const ips = forwarded ? forwarded.split(/, /)[0] : req.connection.remoteAddress
    return ips && ips.length > 0 && ips.indexOf(",") ? ips.split(",")[0] : null
}

export const dataSave = async (data, model) => {
    const savehandle = new model(data)
    return await savehandle.save().then(result=>{
        if(!result){
            return false
        }else{
            return result
        }
    })
}

export const signAccessToken = (res, payload) => {
    try {
        if (payload) {
            const accessToken = jwt.sign({ ...payload }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1d' })
            const refreshToken = jwt.sign({ ...payload }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '90d' })
            res.cookie('refreshToken', `${refreshToken}`, { maxAge: 86400 * 90, httpOnly: true })
            return { accessToken, refreshToken }
        }
    } catch (err) {
        return res.status(401).json({ error: 'Unauthorized' })
    }
}

export const signRefreshToken = (req, res) => {
    try {
        const getToken = req.cookies.refreshToken
        if (getToken) {
            const { id, _id } = jwt.verify(getToken, process.env.REFRESH_TOKEN_SECRET)
            const accesssToken = jwt.sign({ id, _id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '90d' })
            return { accesssToken }
        }
    } catch (err) {
        return res.status(401).json({ error: 'Unauthorized' })
    }
}

export const createToken = async (account, games_id) => {
    let data = {}
    data['intimestamp'] = new Date(new Date().valueOf() + 1000 * 900)
    data['users_id'] = account._id
    data['username'] = account.username
    data['email'] = account.email
    data['currency'] = account.currency
    data['lastname'] = account?.lastname
    data['firstname'] = account?.firstname
    let token = md5(data)
    data['token'] = token
    await dataSave({users_id: account._id, games_id }, GameHistories)
    return data
}

export const getTimeZone = () =>{
    let time = moment.tz(new Date(), "Europe/London")
    time.utc("+1").format()
    return time
}

export const fairylandError = (error) => {
	var array = {
		"303": "Incorrect player identifier for secure token.",
		"304": "Incomplete or malformed request.",
		"305": "User Balance is not enough.",
	}
	return array[error]
}

export const getGameID = async (LAUNCHURL, ID) => {
	const item = await GameLists.findOne({LAUNCHURL, ID})
	if (item) {
		return { games_id: item._id, providers_id: item.providers_id}
	} else {
		return false
	}
}

export const sessionUpdate = async (users_id) => {
	const handler1 = await GameSessions.findOneAndUpdate({users_id}, {expiration: new Date(new Date().valueOf() + 3600 * 1000)})
    const handler2 = await Sessions.findOneAndUpdate({users_id}, {expiration: new Date(new Date().valueOf() + 3600 * 1000)})
    if(handler1&&handler2){
        return true
    }else{
        return false
    }
}

export const saveGoldHistory = async (goldsHistory) => {
	if (goldsHistory.debited == 0 && goldsHistory.credited == 0) {} else {
		await dataSave(goldsHistory, GoldHistories)
	}
	return true
}

export const playerBalanceUpdate = async(amount, users_id, golds) => {
	const gold = parseFloat(amount)
	const result = await Users.findOneAndUpdate({_id: users_id}, {$inc: {gold}}, {new: true, upsert: true})
	if (!result) {
		return false
	} else {
		const goldsHistory = Object.assign({}, golds, { update_gold: result.gold })
		saveGoldHistory(goldsHistory)
		sessionUpdate(users_id)
		return result.gold.toFixed(2)
	}
}