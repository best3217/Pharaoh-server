import { Schema, model } from 'mongoose'
const levelsSchema = new Schema({
	title: {
		type: String
	},
	level: {
		type: Number
	},
	current_amount: {
		type: Number
	},
	next_amount: {
		type: Number
	}
},{ 
  timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } 
})
export const Levels = model('levels', levelsSchema)