import { model, Schema } from 'mongoose'
const bonusSlotsSchema = new Schema({
	id: {
		type: Number
	},
	type: {
		type: String
	},
	image: {
		type: String
	},
	amount: {
		type: Number
	}
},{ 
  timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' }
})
export const BonusSlots = model('bonus_slots', bonusSlotsSchema)