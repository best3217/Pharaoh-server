import { Types } from 'mongoose'
import { GameLists } from '../models'
import { dataSave } from './baseController'

export const get = async (req,res,next) => {
    let data = await GameLists.find().sort({order: 0})
    return res.json({status:true, data})
}

export const create = async (req,res,next) => {
    const data = await dataSave(req.body, GameLists)
    return res.json({status:true, data})
}

export const getOne = async (req,res,next) => {
    let data = await GameLists.findById(req.params.id)
    return res.json({status:true, data})
}

export const find = async (req,res,next) => {
    let data = await GameLists.find(req.body).sort({order: 0})
    return res.json({status:true, data})
}

export const list = async (req,res,next) => {
    const { perPage = 10, page = 1, provider=null, status, q=null } = req.body
    let query = {}
    if(provider){
        query.providers_id = Types.ObjectId(provider)
    }
    if(status != ''){
        query.status = status
    }
    if(q){
        query.title =  { "$regex": q, "$options": "i" }
    }
    const data = await GameLists.find(query).limit(perPage).skip((page-1)*perPage).sort({order: 0})
    const total = await GameLists.countDocuments(query)
    return res.json({status:true, data, total:total})
}

export const update = async (req,res,next) => {
    let data = await GameLists.findByIdAndUpdate(req.params.id, req.body, {new: true})
    return res.json({status:true, data})
}

export const del = async (req,res,next) => {
    let data = await GameLists.deleteOne({_id:req.params.id})
    return res.json({status:true, data})
}

export const label = async (req,res,next) => {
    const data =  await GameLists.aggregate([
        {
            $match:{ status:true }
        },
        {
            $project:{ label:'$title', value:'$_id' }
        }
    ]);
    return res.json({status:true, data})
}