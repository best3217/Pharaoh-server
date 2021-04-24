import { Schema, model } from 'mongoose'
const shopsSchema = new Schema({
	title: {
		type: String
	},
	type: {
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
	currency: {
		type: String
	},
	price: {
		type: Number
	},
	off: {
		type: Number
	}
},{ 
  timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } 
})
export const Shops = model('shops', shopsSchema)