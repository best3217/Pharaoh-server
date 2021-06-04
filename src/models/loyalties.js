import { Schema, model } from 'mongoose'
const loyaltiesSchema = new Schema({
	title: {
		type: String
	},
	points: {
		type: Number
	},
	amount: {
		type: Number
	},
	image: {
		type: String
	},
	daily_login: {
		type: Number
	},
	gold_purchase: {
		type: Number
	},
	crown_purchase: {
		type: Number
	},
	cards_collected: {
		type: Number
	},
	level_up_bouns: {
		type: Number
	},
	vip_support: {
		type: Number
	},
},{ 
  timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } 
})
export const Loyalties = model('loyalties', loyaltiesSchema)