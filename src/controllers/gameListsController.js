import { GameLists } from '../models'
import { dataSave } from './baseController'

export const get = async (req,res,next) => {
    let data = await GameLists.find()
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
    let data = await GameLists.find(req.body)
    return res.json({status:true, data})
}

export const update = async (req,res,next) => {
    let data = await GameLists.updateOne({_id:req.params.id}, req.body)
    return res.json({status:true, data})
}

export const del = async (req,res,next) => {
    let data = await GameLists.deleteOne({_id:req.params.id})
    return res.json({status:true, data})
}