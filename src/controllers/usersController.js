import { LoginHistories, Users, Permissions } from '../models'
import { getIPAddress, dataSave, signRefreshToken, signAccessToken } from './baseController'

export const login = async (req,res,next) => {
    const user = req.body
    if(!user.password||(!user.email)){
        return res.json({status: false, error: 'validate'})
    }
    const userInfo = await Users.findOne({$or: [{username: user.email}, {email: user.email}]})
    if(!userInfo){
        return res.json({status: false, error: 'incorrect'})
    }
    if(!userInfo.validPassword(user.password, userInfo.password)){
        return res.json({status: false, error: 'password'})
    }
    const ip = getIPAddress(req)
    const result = await dataSave({email: user.email, ip, users_id: userInfo._id}, LoginHistories)
    if(!result){
        return res.json({status: false, error: 'error'})
    }else{
        const token = signAccessToken(res, { id: Date.now(), _id: userInfo._id })
        return res.json({status: true, user: userInfo, accessToken: token})
    }
}

export const register = async (req,res,next) => {
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
    const permissions_id = await Permissions.findOne({title:'player'})
    const result = await dataSave(Object.assign({}, user, {permissions_id}), Users)
    if(!result){
        return res.json({status: false, error: 'error'})
    }else{
        const token = signAccessToken(res, { id: Date.now(), _id: result._id })
        return res.json({status: true, user:result, accessToken:token})
    }
}

export const refreshToken = (req, res) => {
    const refreshToken = signRefreshToken(req, res)
    return res.status(200).json(refreshToken)
}




export const get = async (req,res,next) => {
    let data = await Users.find()
    return res.json({status:true, data})
}

export const create = async (req,res,next) => {
    const data = await dataSave(req.body, Users)
    return res.json({status:true, data})
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
    let data = await Users.updateOne({_id:req.params.id}, req.body)
    return res.json({status:true, data})
}

export const del = async (req,res,next) => {
    let data = await Users.deleteOne({_id:req.params.id})
    return res.json({status:true, data})
}