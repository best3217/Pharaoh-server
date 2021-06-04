import { Schema, model } from 'mongoose'
const card_typesSchema = new Schema({
	title: {
		type: String
	},
	description: {
		type: String
	},
	gold: {
		type: Number
	},
	raffle: {
		type: Number
	},
	created: {
		type: Date
	}
},{ 
  timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } 
})
export const CardTypes = model('card_types', card_typesSchema)