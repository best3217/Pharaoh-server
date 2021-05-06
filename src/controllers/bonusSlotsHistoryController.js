import { BonusSlotsHistories, Sessions, Users } from '../models'
import { dataSave } from './baseController'

export const get = async (req,res,next) => {
    let data = await BonusSlotsHistories.find().populate("users_id").populate("bonus_slots_id")
    return res.json({status:true, data})
}

export const create = async (req,res,next) => {
    const data = await dataSave(req.body, BonusSlotsHistories)
    return res.json({status:true, data})
}

export const getOne = async (req,res,next) => {
    let data = await BonusSlotsHistories.findById(req.params.id)
    return res.json({status:true, data})
}

export const find = async (req,res,next) => {
    let data = await BonusSlotsHistories.find(req.body).populate("users_id")
    return res.json({status:true, data})
}

export const list = async (req,res,next) => {
    const { perPage = 10, page = 1, q=null } = req.body
    let query = {}
    if(q){
        query.title =  { "$regex": q, "$options": "i" }
    }
    const data = await BonusSlotsHistories.find(query).populate("users_id").limit(perPage).skip((page-1)*perPage)
    const total = await BonusSlotsHistories.countDocuments(query)
    return res.json({status:true, data, total:total})
}

export const save = async (req,res,next) => {
    const crown = req.body.filter(e => e.type === 'CURRENCY_CROWN' ).reduce((a, {amount}) => a + amount, 0)
    const gold = req.body.filter(e => e.type === 'CURRENCY_GOLD' ).reduce((a, {amount}) => a + amount, 0)
    const cards = req.body.filter(e => e.type === 'CARDS' ).reduce((a, {amount}) => a + amount, 0)
    await Users.updateOne({_id: req.user._id}, {$inc: {gold:gold, crown:crown, cards:cards}}, {new: true, upsert: true})
    const remaining = new Date().valueOf() + parseInt(process.env.BONUS_SLOTS_REMAINING_TIME)
    const saveData = {
        users_id: req.user._id,
        bonus_slots_id: [
            req.body[0]._id,
            req.body[1]._id,
            req.body[2]._id,
        ],
        remaining
    }
    const data = await dataSave(saveData, BonusSlotsHistories)
    const { socketid } = await Sessions.findOne({users_id: req.user._id})
    req.app.get('io').to(socketid).emit('bonus-slots-remaining', remaining)
    return res.json({status:true, data})
}

export const update = async (req,res,next) => {
    let data = await BonusSlotsHistories.findByIdAndUpdate(req.params.id, req.body, {new: true})
    return res.json({status:true, data})
}

export const del = async (req,res,next) => {
    let data = await BonusSlotsHistories.deleteOne({_id:req.params.id})
    return res.json({status:true, data})
}