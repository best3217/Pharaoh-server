import { model, Schema } from 'mongoose'
const daliyCardHistoriesSchema = new Schema({
	users_id: {
		type: Schema.Types.ObjectId,
		required: true,
		ref: 'users'
	},
	daliy_cards_id: {
		type: Schema.Types.ObjectId,
		required: true,
		ref: 'daliy_card_lists'
	},
	crown: {
		type: Number
	},
	cards: {
		type: Number
	},
	gold: {
		type: Number
	},
	date: {
		type: String
	}
},{ 
  timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } 
})
export const daliyCardHistories = model('daliy_card_histories', daliyCardHistoriesSchema)