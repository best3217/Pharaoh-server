import { Schema, model } from 'mongoose'
const betting_historiesSchema = new Schema({
	users_id: {
		type: Schema.Types.ObjectId,
		required: true,
		ref: 'users'
	},
	providers_id: {
		type: Schema.Types.ObjectId,
		required: true,
		ref: 'providers'
	},
	games_id: {
		type: Schema.Types.ObjectId,
		required: true,
		ref: 'game_lists'
	},
	amount: {
		type: Number
	},
	betting: {
		type: Map
	},
	type: {
		type: String
	},
},{ 
  timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } 
})
export const BettingHistories = model('betting_histories', betting_historiesSchema)