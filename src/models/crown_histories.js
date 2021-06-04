import { Schema, model } from 'mongoose'
const crown_historiesSchema = new Schema({
	title: {
		type: String
	},
	crown: {
		type: Number
	},
	event: {
		type: String
	},
},{ 
  timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } 
})
export const CrownHistories = model('crown_histories', crown_historiesSchema)