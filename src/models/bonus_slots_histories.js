import { model, Schema } from 'mongoose'
const bonusSlots_historiesSchema = new Schema({
	users_id: {
		type: Schema.Types.ObjectId,
		required: true,
		ref: 'users'
	},
	bonus_slots_id: [{
		type: Schema.Types.ObjectId,
		required: true,
		ref: 'bonus_slots'
	}],
	remaining: {
		type: Number
	}
},{ 
  timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' }
})
export const BonusSlotsHistories = model('bonus_slots_histories', bonusSlots_historiesSchema)