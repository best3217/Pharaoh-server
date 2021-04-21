import { Schema, model } from 'mongoose'
const levelsSchema = new Schema({
	title: {
		type: String
	},
	level: {
		type: Number
	},
	amount: {
		type: Number
	},
},{ 
  timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } 
})
export const Levels = model('levels', levelsSchema)