import { BonusSlots } from '../models'
import { dataSave } from './baseController'

export const get = async (req,res,next) => {
    let data = await BonusSlots.find()
    return res.json({status:true, data})
}

export const create = async (req,res,next) => {
    const data = await dataSave(req.body, BonusSlots)
    return res.json({status:true, data})
}

export const getOne = async (req,res,next) => {
    let data = await BonusSlots.findById(req.params.id)
    return res.json({status:true, data})
}

export const find = async (req,res,next) => {
    let data = await BonusSlots.find(req.body)
    return res.json({status:true, data})
}

export const list = async (req,res,next) => {
    const { perPage = 10, page = 1, q=null } = req.body
    let query = {}
    if(q){
        query.title =  { "$regex": q, "$options": "i" }
    }
    const data = await BonusSlots.find(query).limit(perPage).skip((page-1)*perPage)
    const total = await BonusSlots.countDocuments(query)
    return res.json({status:true, data, total:total})
}

export const update = async (req,res,next) => {
    let data = await BonusSlots.findByIdAndUpdate(req.params.id, req.body, {new: true})
    return res.json({status:true, data})
}

export const del = async (req,res,next) => {
    let data = await BonusSlots.deleteOne({_id:req.params.id})
    return res.json({status:true, data})
}

const getRamdomData = async () => {
    const count = await BonusSlots.countDocuments()
    const random = Math.floor(Math.random() * count)
    return await BonusSlots.findOne().skip(random)
}

export const random = async (req,res,next) => {
    const data1 = await getRamdomData()
    const data2 = await getRamdomData()
    const data3 = await getRamdomData()
    const data = [
        data1,
        data2,
        data3
    ]
    return res.json({status:true, data})
}