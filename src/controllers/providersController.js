import { Providers } from '../models'
import { dataSave } from './baseController'

export const get = async (req,res,next) => {
    let data = await Providers.find()
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

export const find = async (req,res,next) => {
    let data = await Providers.find(req.body)
    return res.json({status:true, data})
}

export const update = async (req,res,next) => {
    let data = await Providers.updateOne({_id:req.params.id}, req.body)
    return res.json({status:true, data})
}

export const del = async (req,res,next) => {
    let data = await Providers.deleteOne({_id:req.params.id})
    return res.json({status:true, data})
}