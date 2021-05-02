import md5 from 'md5'
import { Types } from 'mongoose'
import { LoginHistories, Users, Permissions, Sessions, Levels, BettingHistories, GameSessions } from '../models'
import { getIPAddress, dataSave, signRefreshToken, signAccessToken, royalLeague } from './baseController'

export const login = async (req,res,next) => {
    const user = req.body
    if(!user.password||(!user.email)){
        return res.json({status: false, error: 'validate'})
    }
    const userInfo = await Users.findOne({$or: [{username: user.email}, {email: user.email}]}).populate('levels_id')
    if(!userInfo){
        return res.json({status: false, error: 'incorrect'})
    }
    if(!userInfo.validPassword(user.password, userInfo.password)){
        return res.json({status: false, error: 'password'})
    }
    const ip = getIPAddress(req)
    const loginHistory = {email: user.email, ip, users_id: userInfo._id}
    const result = await dataSave(loginHistory, LoginHistories)
    if(!result){
        return res.json({status: false, error: 'error'})
    }else{
        const session = signAccessToken(req, userInfo._id)
        await Sessions.updateOne({users_id: userInfo._id}, session, {new: true, upsert: true})
        return res.json({status: true, user: userInfo, accessToken: session})
    }
}

export const register = async (req,res,next) => {
    const user = req.body
    const role = (req.headers.role?req.headers.role:'player')
    if(!user.username||!user.email||!user.password){
        return res.json({status: false, error:'validate'})
    }
    const emailExit = await Users.findOne({email:user.email})
    if(emailExit){
        return res.json({status: false, error:'email'})
    }
    const usernameExit = await Users.findOne({username:user.username})
    if(usernameExit){
        return res.json({status: false, error:'username'})
    }
    const permissions_id = await Permissions.findOne({title:role})
    const levels_id = await Levels.findOne({level:1})
    const result = await dataSave(Object.assign({}, user, {permissions_id, levels_id}), Users)
    if(!result){
        return res.json({status: false, error: 'error'})
    }else{
        const session = signAccessToken(req, result._id)
        await Sessions.updateOne({users_id: result._id}, session, {new: true, upsert: true})
        return res.json({status: true, user: result, accessToken: session})
    }
}

export const refreshToken = (req, res) => {
    const refreshToken = signRefreshToken(req, res)
    return res.json(refreshToken)
}

export const get = async (req,res,next) => {
    let data = await Users.find().populate("permissions_id").populate("levels_id")
    return res.json({status:true, data})
}

export const list = async (req,res,next) => {
    const { perPage = 10, page = 1, role=null, status=null, q=null } = req.body
    let query = {}
    if(role){
        query.permissions_id = Types.ObjectId(role)
    }
    if(status){
        query.status = status
    }
    if(q){
        query.username =  { "$regex": q, "$options": "i" }
    }
    const data = await Users.find(query).populate("permissions_id").populate("levels_id").limit(perPage).skip((page-1)*perPage)
    const total = await Users.countDocuments(query)
    return res.json({status:true, data, total:total})
}

export const create = async (req,res,next) => {
    const user = req.body
    if(!user.username||!user.email||!user.password){
        return res.json({status: false, error:'validate'})
    }
    const emailExit = await Users.findOne({email:user.email})
    if(emailExit){
        return res.json({status: false, error:'email'})
    }
    const usernameExit = await Users.findOne({username:user.username})
    if(usernameExit){
        return res.json({status: false, error:'username'})
    }
    const result = await dataSave(user, Users)
    if(!result){
        return res.json({status: false, error: 'error'})
    }else{
        return res.json({status: true, data: result})
    }
}

export const getOne = async (req,res,next) => {
    let data = await Users.findById(req.params.id)
    return res.json({status:true, data})
}

export const find = async (req,res,next) => {
    let data = await Users.find(req.body)
    return res.json({status:true, data})
}

export const update = async (req,res,next) => {
    delete req.body.password
    let data = await Users.findByIdAndUpdate(req.params.id, req.body, {new: true}).populate("permissions_id").populate("levels_id")
    return res.json({status:true, data})
}

export const del = async (req,res,next) => {
    let data = await Users.deleteOne({_id:req.params.id})
    return res.json({status:true, data})
}

export const label = async (req,res,next) => {
    const data =  await Users.aggregate([{
        $project:{ label:'$email', value:'$_id' }
    }])
    return res.json({status:true, data})
}

export const logOut = async (req,res,next) => {
    const users_id = Types.ObjectId(req.body.users_id)
    await Sessions.deleteOne({users_id})
    await GameSessions.deleteOne({users_id})
    return res.json({status:true})
}

export const changePassword = async (req,res,next) => {
    const { users_id, newPassword, currentPassword } = req.body
    const user = await Users.findById(users_id)
    if(!user.validPassword(currentPassword, user.password)){
        return res.json({status: false, message: 'passwords do not match'})
    }
    const password = user.generateHash(newPassword)
    const result = await Users.findByIdAndUpdate(users_id, {password})
    if(result){
        return res.json({status: true})
    }else{
        return res.json({status: false, error: "server error"})
    }
}


export const usersRoyalLeague = async (req,res,next) => {
    const data = await Users.aggregate([
        {
            $match:{
                permissions_id:Types.ObjectId('607b8b7b790b633d942543ea')
            }
        },
        {
            $sort: {
                total_win: -1
            }
        },
        {
            $group: {
                _id: {},
                arr: {
                    $push: {
                        _id: '$_id',
                        email: '$email',
                        username: '$username',
                        total_win: '$total_win'
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
                username: '$arr.username',
                total_win: '$arr.total_win',
                royal_league: '$royal_league',
            }
        }
    ])
    return res.json({status: true, data})
}

export const userRoyalLeague = async (req,res,next) => {
    const users_id = Types.ObjectId(req.params.id)
    const bigwin = await BettingHistories.findOne({type:'WIN', users_id}).sort({amount: -1}).select('amount')
    const users = await Users.findById(users_id).populate('levels_id').populate('teams_id')
    const league = await royalLeague(users_id)
    return res.json({status:true, data: {
            bigwin:bigwin?.amount,
            level:users.levels_id?.level, 
            total_win:users.total_win,
            league,
            team:users.teams_id?.team,
            team_rank:users.teams_id?.rank,
            team_league:users.teams_id?.league
        }})
}