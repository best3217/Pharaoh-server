import { Schema, model } from 'mongoose'
const gold_historiesSchema = new Schema({
	users_id: {
		type: Schema.Types.ObjectId,
		required: true,
		ref: 'users'
	},
	games_id: {
		type: Schema.Types.ObjectId,
		required: true,
		ref: 'game_lists'
	},
	credited: {
		type: Number
	},
	debited: {
		type: Number
	},
	last_gold: {
		type: Number
	},
	update_gold: {
		type: Number
	},
},{ 
  timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } 
})
export const GoldHistories = model('gold_histories', gold_historiesSchema)