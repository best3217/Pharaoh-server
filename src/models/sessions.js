import { Schema, model } from 'mongoose'
const sessionsSchema = new Schema({
	users_id: {
		type: Schema.Types.ObjectId,
		required: true,
		ref: 'users'
	},
	socketid: {
		type: String
	},
	expiration: {
		type: Date
	},
	ip: {
		type: String
	},
	accessToken: {
		type: String
	},
	refreshToken: {
		type: String
	}
},{ 
  timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } 
})
export const Sessions = model('sessions', sessionsSchema)