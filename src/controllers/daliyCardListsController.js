import { daliyCardLists } from '../models'
import { dataSave } from './baseController'

export const get = async (req,res,next) => {
    let data = await daliyCardLists.find()
    return res.json({status:true, data})
}

export const create = async (req,res,next) => {
    const data = await dataSave(req.body, daliyCardLists)
    return res.json({status:true, data})
}

export const getOne = async (req,res,next) => {
    let data = await daliyCardLists.findById(req.params.id)
    return res.json({status:true, data})
}

export const find = async (req,res,next) => {
    let data = await daliyCardLists.find(req.body)
    return res.json({status:true, data})
}

export const list = async (req,res,next) => {
    const { perPage = 10, page = 1, q=null } = req.body
    let query = {}
    if(q){
        query.title =  { "$regex": q, "$options": "i" }
    }
    const data = await daliyCardLists.find(query).limit(perPage).skip((page-1)*perPage)
    const total = await daliyCardLists.countDocuments(query)
    return res.json({status:true, data, total:total})
}

export const update = async (req,res,next) => {
    let data = await daliyCardLists.findByIdAndUpdate(req.params.id, req.body, {new: true})
    return res.json({status:true, data})
}

export const del = async (req,res,next) => {
    let data = await daliyCardLists.deleteOne({_id:req.params.id})
    return res.json({status:true, data})
}