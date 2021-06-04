import { Schema, model } from 'mongoose'
const game_sessionsSchema = new Schema({
	users_id: {
		type: Schema.Types.ObjectId,
		required: true,
		ref: 'users'
	},
	email: {
		type: String
	},
	username: {
		type: String
	},
	firstname: {
		type: String
	},
	lastname: {
		type: String
	},
	currency: {
		type: String
	},
	token: {
		type: String
	},
	expiration: {
		type: Date
	},
},{ 
  timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } 
})
export const GameSessions = model('game_sessions', game_sessionsSchema)