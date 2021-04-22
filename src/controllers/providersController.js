import { Types } from 'mongoose'
import { Providers } from '../models'
import { dataSave } from './baseController'

export const get = async (req,res,next) => {
    let data = await Providers.find().sort({order: 0})
    return res.json({status:true, data})
}

export const create = async (req,res,next) => {
    const data = await dataSave(req.body, Providers)
    return res.json({status:true, data})
}

export const getOne = async (req,res,next) => {
    let data = await Providers.findById(req.params.id)
    return res.json({status:true, data})
}

export const list = async (req,res,next) => {
    const { perPage = 10, page = 1, q=null } = req.body
    let query = {}
    if(q){
        query.title =  { "$regex": q, "$options": "i" }
    }
    const data = await Providers.find(query).limit(perPage).skip((page-1)*perPage).sort({order: 0})
    const total = await Providers.countDocuments(query)
    return res.json({status:true, data, total:total})
}

export const label = async (req,res,next) => {
    const data =  await Providers.aggregate([{
        $project:{ label:'$title', value:'$_id' }
    }]);
    return res.json({status:true, data})
}

export const find = async (req,res,next) => {
    let data = await Providers.find(req.body).sort({order: 0})
    return res.json({status:true, data})
}

export const update = async (req,res,next) => {
    let data = await Providers.findByIdAndUpdate(req.params.id, req.body, {new: true})
    return res.json({status:true, data})
}

export const del = async (req,res,next) => {
    let data = await Providers.deleteOne({_id:req.params.id})
    return res.json({status:true, data})
}