import mongoose, { Schema } from 'mongoose'
const daliyCardHistoriesSchema = new Schema({
	users_id: {
		type: Schema.Types.ObjectId,
		required: true,
		ref: 'users'
	},
	daily_cards: {
		type: Array
	},
	crown: {
		type: Number
	},
	cards: {
		type: Number
	},
	gold: {
		type: Number
	}
},{ 
  timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } 
})
export const daliyCardHistories = mongoose.model('daliy_card_histories', daliyCardHistoriesSchema)