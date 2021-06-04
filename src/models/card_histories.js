import { Schema, model } from 'mongoose'
const card_historiesSchema = new Schema({
	users_id: {
		type: Schema.Types.ObjectId,
		required: true,
		ref: 'users'
	},
	cards_id: {
		type: Schema.Types.ObjectId,
		required: true,
		ref: 'cards'
	},
	count: {
		type: Number
	},
},{ 
  timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } 
})
export const CardHistories = model('card_histories', card_historiesSchema)