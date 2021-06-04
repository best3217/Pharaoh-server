import { Types } from 'mongoose'
import { Missions } from '../models'
import { dataSave } from './baseController'

export const get = async (req,res,next) => {
    let data = await Missions.find().sort({order: 0}).populate("games_id")
    return res.json({status:true, data})
}

export const create = async (req,res,next) => {
    const result = await dataSave(req.body, Missions)
    const data = await Missions.findById(result._id).populate("games_id")
    return res.json({status:true, data})
}

export const getOne = async (req,res,next) => {
    let data = await Missions.findById(req.params.id).populate("games_id")
    return res.json({status:true, data})
}

export const list = async (req,res,next) => {
    const { perPage = 10, page = 1, q=null } = req.body
    let query = {}
    if(q){
        query.title =  { "$regex": q, "$options": "i" }
    }
    const data = await Missions.find(query).populate("games_id").limit(perPage).skip((page-1)*perPage).sort({order: 0})
    const total = await Missions.countDocuments(query)
    return res.json({status:true, data, total:total})
}

export const label = async (req,res,next) => {
    const data =  await Missions.aggregate([{
        $project:{ label:'$title', value:'$_id' }
    }]);
    return res.json({status:true, data})
}

export const find = async (req,res,next) => {
    let data = await Missions.find(req.body).sort({order: 0}).populate("games_id")
    return res.json({status:true, data})
}

export const update = async (req,res,next) => {
    let data = await Missions.findByIdAndUpdate(req.params.id, req.body, {new: true}).populate("games_id")
    return res.json({status:true, data})
}

export const del = async (req,res,next) => {
    let data = await Missions.deleteOne({_id:req.params.id})
    return res.json({status:true, data})
}