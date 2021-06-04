import { Schema, model } from 'mongoose'
const game_historiesSchema = new Schema({
	users_id: {
		type: Schema.Types.ObjectId,
		required: true,
		ref: 'users'
	},
	games_id: {
		type: Schema.Types.ObjectId,
		required: true,
		ref: 'game_lists'
	},
},{ 
  timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } 
})
export const GameHistories = model('game_histories', game_historiesSchema)