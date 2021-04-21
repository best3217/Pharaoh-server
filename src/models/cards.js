import { Schema, model } from 'mongoose'
const cardsSchema = new Schema({
	card_types_id: {
		type: Schema.Types.ObjectId,
		required: true,
		ref: 'card_types'
	},
	image: {
		type: String
	},
	amount: {
		type: Number
	},
},{ 
  timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } 
})
export const Cards = model('cards', cardsSchema)