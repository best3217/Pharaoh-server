import jwt from 'jsonwebtoken'
import md5 from 'md5'
import moment from 'moment-timezone'
import { Types } from 'mongoose'
import { BettingHistories, GameHistories, GameLists, GameSessions, GoldHistories, Levels, Sessions, Users } from '../models'

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

export const signAccessToken = (req, users_id) => {
    try {
        if (users_id) {
            const expiration = new Date(new Date().valueOf() + parseInt(process.env.USER_SESSION_TIME))
            const accessToken = md5(users_id+expiration)
            const refreshToken = md5(users_id+expiration)
            const ip = getIPAddress(req)
            return { accessToken, refreshToken, expiration, ip, users_id }
        }
    } catch (err) {
        return res.status(401).json({ error: 'Unauthorized' })
    }
}

export const signRefreshToken = (req, res) => {
    try {
        const getToken = req.cookies.refreshToken
        if (getToken) {
            const { id, _id } = jwt.verify(getToken, parseInt(process.env.REFRESH_TOKEN_SECRET))
            const accesssToken = jwt.sign({ id, _id }, parseInt(process.env.ACCESS_TOKEN_SECRET), { expiresIn: '90d' })
            return { accesssToken }
        }
    } catch (err) {
        return res.status(401).json({ error: 'Unauthorized' })
    }
}

export const createToken = async (account, games_id) => {
    let data = {}
    data['expiration'] = new Date(new Date().valueOf() + parseInt(process.env.GAME_SESSION_TIME))
    data['users_id'] = account._id
    data['username'] = account.username
    data['email'] = account.email
    data['currency'] = 'usd'
    data['lastname'] = account?.lastname
    data['firstname'] = account?.firstname
    let token = md5(JSON.stringify(data))
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
	const item = await GameLists.findOne({ID})
	if (item) {
		return { games_id: item._id, providers_id: item.providers_id}
	} else {
		return false
	}
}

export const sessionUpdate = async (users_id) => {
	const handler1 = await GameSessions.findOneAndUpdate({users_id}, {expiration: new Date(new Date().valueOf() + parseInt(process.env.UPDATE_SESSION_TIME))})
    const handler2 = await Sessions.findOneAndUpdate({users_id}, {expiration: new Date(new Date().valueOf() + parseInt(process.env.UPDATE_SESSION_TIME))})
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

export const playerLevelUp = async (users_id, level, req) => {
    const result = await Users.findByIdAndUpdate(users_id, {$inc: {level}}, {new: true, upsert: true}).populate('levels_id')
    const { socketid } = await Sessions.findOne({users_id})
    if(result.level > result.levels_id.next_amount){
        const newLevel = await Levels.findOne({level: result.levels_id.level+1})
        if(newLevel){
            await Users.findByIdAndUpdate(users_id, {levels_id: newLevel._id}, {new: true, upsert: true}).populate('levels_id')
            const mylevel = (result.level - newLevel.current_amount) / (newLevel.next_amount - newLevel.current_amount)
            req.app.get('io').to(socketid).emit('level-up', {mylevel, newLevel: newLevel.level})
        }
    }else{
        const mylevel = (result.level - result.levels_id.current_amount) / (result.levels_id.next_amount - result.levels_id.current_amount)
        req.app.get('io').to(socketid).emit('level-progress', {mylevel})
    }
    const league = await royalLeague(users_id)
    if(league.length){
        req.app.get('io').to(socketid).emit('royal-league', league[0])
    }
}

export const range = (start, end) => {
    return(new Array(end - start + 1).fill().map((el, ind) => ind + start))
}

export const royalLeague = async (users_id) => {
    const data = await Users.aggregate([
        {
            $sort: {
                level: -1
            }
        },
        {
            $group: {
                _id: {},
                arr: {
                    $push: {
                        _id: '$_id',
                        email: '$email',
                        level: '$level'
                    }
                }
            }
        }, 
        {
            $unwind: {
                path: '$arr',
                includeArrayIndex: 'royal_league',
            }
        },{
            $project: {
                _id: '$arr._id',
                email: '$arr.email',
                level: '$arr.level',
                royal_league: '$royal_league',
            }
        },
        {
            $match:{
                _id:Types.ObjectId(users_id)
            }
        }
    ])
    if(data.length){
        return data[0].royal_league + 1
    }else{
        return '-'
    }
}

export const get_player_id = () => {
    let a = String(new Date().valueOf())
    return a.slice((a.length-1-7), (a.length-1))
}
