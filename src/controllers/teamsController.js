import { Teams } from '../models'
import { dataSave } from './baseController'

export const get = async (req,res,next) => {
    let data = await Teams.find()
    return res.json({status:true, data})
}

export const create = async (req,res,next) => {
    const data = await dataSave(req.body, Teams)
    return res.json({status:true, data})
}

export const getOne = async (req,res,next) => {
    let data = await Teams.findById(req.params.id)
    return res.json({status:true, data})
}

export const find = async (req,res,next) => {
    let data = await Teams.find(req.body)
    return res.json({status:true, data})
}

export const update = async (req,res,next) => {
    let data = await Teams.updateOne({_id:req.params.id}, req.body)
    return res.json({status:true, data})
}

export const del = async (req,res,next) => {
    let data = await Teams.deleteOne({_id:req.params.id})
    return res.json({status:true, data})
}