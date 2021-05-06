import { Types } from 'mongoose'
import { BettingHistories } from '../models'
import { dataSave } from './baseController'

export const get = async (req,res,next) => {
    let data = await BettingHistories.find().populate("users_id").populate("games_id").populate("providers_id")
    return res.json({status:true, data})
}

export const create = async (req,res,next) => {
    const data = await dataSave(req.body, BettingHistories)
    return res.json({status:true, data})
}

export const getOne = async (req,res,next) => {
    let data = await BettingHistories.findById(req.params.id)
    return res.json({status:true, data})
}

export const find = async (req,res,next) => {
    let data = await BettingHistories.find(req.body).populate("users_id").populate("games_id").populate("providers_id")
    return res.json({status:true, data})
}

export const list = async (req,res,next) => {
    const { perPage = 10, page = 1, games_id='', users_id='', providers_id='', status='', datePicker='' } = req.body
    let query = {}
    if(games_id !== ''){
        query.games_id = Types.ObjectId(games_id)
    }
    if(users_id !== ''){
        query.users_id = Types.ObjectId(users_id)
    }
    if(providers_id !== ''){
        query.providers_id = Types.ObjectId(providers_id)
    }
    if(status !== ''){
        query.type = status
    }
    if(datePicker !== '' && datePicker[0] && datePicker[1]){
        query = Object.assign({}, query, { $and: [ { createdAt: { $gte: new Date(datePicker[0]) } }, { createdAt: { $lte: new Date(datePicker[1]) } } ] })
    }
    const data = await BettingHistories.find(query).populate("users_id").populate("games_id").populate("providers_id").limit(perPage).skip((page-1)*perPage)
    const total = await BettingHistories.countDocuments(query)
    const amount =  await BettingHistories.aggregate([
        { $match: query },
        { $group: { _id: '$type', amount: { $sum: "$amount" } } }
    ])
    const users =  await BettingHistories.aggregate([
        { $match: query },
        { $group: { _id: '$users_id' } },
    ])
    const bet = amount.find(e=>e._id ==='BET')
    const win = amount.find(e=>e._id ==='WIN')
    const balance = { bet: bet?bet.amount:0, win: win?win.amount:0 }
    return res.json({status:true, data, total:total, balance, users:users.length })
}

export const label = async (req,res,next) => {
    const data =  await BettingHistories.aggregate([{
        $project:{ label:'$title', value:'$_id' }
    }]);
    return res.json({status:true, data})
}

export const update = async (req,res,next) => {
    let data = await BettingHistories.findByIdAndUpdate(req.params.id, req.body, {new: true})
    return res.json({status:true, data})
}

export const del = async (req,res,next) => {
    let data = await BettingHistories.deleteOne({_id:req.params.id})
    return res.json({status:true, data})
}