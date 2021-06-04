import { GameSessions } from '../models'
import { dataSave } from './baseController'

export const get = async (req,res,next) => {
    let data = await GameSessions.find().populate("users_id")
    return res.json({status:true, data})
}

export const create = async (req,res,next) => {
    const data = await dataSave(req.body, GameSessions)
    return res.json({status:true, data})
}

export const getOne = async (req,res,next) => {
    let data = await GameSessions.findById(req.params.id)
    return res.json({status:true, data})
}

export const list = async (req,res,next) => {
    const { perPage = 10, page = 1, q=null } = req.body
    let query = {}
    if(q){
        query.title =  { "$regex": q, "$options": "i" }
    }
    const data = await GameSessions.find(query).populate("users_id").limit(perPage).skip((page-1)*perPage)
    const total = await GameSessions.countDocuments(query)
    return res.json({status:true, data, total:total})
}

export const find = async (req,res,next) => {
    let data = await GameSessions.find(req.body).populate("users_id")
    return res.json({status:true, data})
}

export const update = async (req,res,next) => {
    let data = await GameSessions.findByIdAndUpdate(req.params.id, req.body, {new: true})
    return res.json({status:true, data})
}

export const del = async (req,res,next) => {
    let data = await GameSessions.deleteOne({_id:req.params.id})
    return res.json({status:true, data})
}