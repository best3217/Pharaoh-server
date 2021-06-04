import { Schema, model } from 'mongoose'
const permissionsSchema = new Schema({
	title: {
		type: String
	},
	order: {
		type: Number
	},
},{ 
  timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } 
})
export const Permissions = model('permissions', permissionsSchema)