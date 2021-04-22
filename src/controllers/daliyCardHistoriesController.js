import { daliyCardHistories } from '../models'
import { dataSave } from './baseController'

export const get = async (req,res,next) => {
    let data = await daliyCardHistories.find().populate("users_id").populate("daliy_cards_id")
    return res.json({status:true, data})
}

export const create = async (req,res,next) => {
    const data = await dataSave(req.body, daliyCardHistories)
    return res.json({status:true, data})
}

export const getOne = async (req,res,next) => {
    let data = await daliyCardHistories.findById(req.params.id).populate("users_id").populate("daliy_cards_id")
    return res.json({status:true, data})
}

export const find = async (req,res,next) => {
    let data = await daliyCardHistories.find(req.body).populate("users_id").populate("daliy_cards_id")
    return res.json({status:true, data})
}

export const list = async (req,res,next) => {
    const { perPage = 10, page = 1, q=null } = req.body
    let query = {}
    if(q){
        query.users_id =  q
    }
    const data = await daliyCardHistories.find(query).limit(perPage).skip((page-1)*perPage).populate("users_id").populate("daliy_cards_id")
    const total = await daliyCardHistories.countDocuments(query)
    return res.json({status:true, data, total:total})
}

export const update = async (req,res,next) => {
    let data = await daliyCardHistories.findByIdAndUpdate(req.params.id, req.body, {new: true}).populate("users_id").populate("daliy_cards_id")
    return res.json({status:true, data})
}

export const del = async (req,res,next) => {
    let data = await daliyCardHistories.deleteOne({_id:req.params.id})
    return res.json({status:true, data})
}