import { Types } from 'mongoose'
import { TeamMembers, Users } from '../models'
import { dataSave } from './baseController'

export const get = async (req,res,next) => {
    const data = await TeamMembers.find().populate('users_id').populate('teams_id')
    return res.json({status:true, data})
}

export const join = async (req,res,next) => {
    const users_id = req.user._id
    const teams_id = req.body._id
    const team = { users_id, teams_id }
    const { _id } = await TeamMembers.findOneAndUpdate({users_id}, team, {new: true, upsert: true})
    await Users.findByIdAndUpdate(users_id, {team_members_id: _id, teams_id}, {new: true})
    return res.json({status: true, data: {team_members_id:_id, teams_id}})
}

export const create = async (req,res,next) => {
    const data = await dataSave(req.body, TeamMembers)
    return res.json({status:true, data})
}

export const getOne = async (req,res,next) => {
    const data = await TeamMembers.findById(req.params.id).populate('users_id').populate('teams_id')
    return res.json({status:true, data})
}

export const find = async (req,res,next) => {
    const data = await TeamMembers.find(req.body).populate('users_id').populate('teams_id')
    return res.json({status:true, data})
}

export const list = async (req,res,next) => {
    const { perPage = 10, page = 1, q=null } = req.body
    const query = {}
    if(q){
        query.title =  { "$regex": q, "$options": "i" }
    }
    const data = await TeamMembers.find(query).limit(perPage).skip((page-1)*perPage).populate('users_id').populate('teams_id')
    const total = await TeamMembers.countDocuments(query)
    return res.json({status:true, data, total:total})
}

export const update = async (req,res,next) => {
    const data = await TeamMembers.findByIdAndUpdate(req.params.id, req.body, {new: true}).populate('users_id').populate('teams_id')
    return res.json({status:true, data})
}

export const del = async (req,res,next) => {
    const data = await TeamMembers.deleteOne({_id:Types.ObjectId(req.params.id)})
    return res.json({status:true, data})
}