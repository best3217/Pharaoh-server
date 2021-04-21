import { daliyCardHistories } from '../models'
import { dataSave } from './baseController'

export const get = async (req,res,next) => {
    let data = await daliyCardHistories.find()
    return res.json({status:true, data})
}

export const create = async (req,res,next) => {
    const data = await dataSave(req.body, daliyCardHistories)
    return res.json({status:true, data})
}

export const getOne = async (req,res,next) => {
    let data = await daliyCardHistories.findById(req.params.id)
    return res.json({status:true, data})
}

export const find = async (req,res,next) => {
    let data = await daliyCardHistories.find(req.body)
    return res.json({status:true, data})
}

export const update = async (req,res,next) => {
    let data = await daliyCardHistories.updateOne({_id:req.params.id}, req.body)
    return res.json({status:true, data})
}

export const del = async (req,res,next) => {
    let data = await daliyCardHistories.deleteOne({_id:req.params.id})
    return res.json({status:true, data})
}