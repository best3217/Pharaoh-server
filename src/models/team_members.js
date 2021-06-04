import { model, Schema } from 'mongoose'
const teamMembersSchema = new Schema({
    teams_id: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'teams'
    },
    users_id: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'users'
    },
    rank: {
        type: Number,
        default: 1
    },
    score: {
        type: Number,
        default: 0
    },
    battles: {
        type: Number,
        default: 0
    },
    ranks1: {
        type: Number
    },
    activity: {
        type: Boolean,
        default: false
    },
    reward: {
        type: Number,
        default: 2500000
    }
},{ 
  timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } 
})
export const TeamMembers = model('teamMembers', teamMembersSchema)