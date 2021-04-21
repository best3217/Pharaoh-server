import { Schema, model } from 'mongoose'
const login_historiesSchema = new Schema({
	users_id: {
		type: Schema.Types.ObjectId,
		required: true,
		ref: 'users'
	},
	session_id: {
		type: String
	},
	email: {
		type: String
	},
	ip: {
		type: String
	},
},{ 
  timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } 
})
export const LoginHistories = model('login_histories', login_historiesSchema)