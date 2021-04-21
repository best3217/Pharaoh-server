import { Schema, model } from 'mongoose'
const shopsSchema = new Schema({
	type: {
		type: String
	},
	title: {
		type: String
	},
	amount: {
		type: Number
	},
	trading_cards: {
		type: Number
	},
	loyalty_points: {
		type: Number
	},
	slots_upgrade: {
		type: Number
	},
	price: {
		type: Number
	},
},{ 
  timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } 
})
export const Shops = model('shops', shopsSchema)