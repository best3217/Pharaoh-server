import { Schema, model } from 'mongoose'
const shopping_historiesSchema = new Schema({
	users_id: {
		type: Schema.Types.ObjectId,
		required: true,
		ref: 'users'
	},
	shops_id: {
		type: Schema.Types.ObjectId,
		required: true,
		ref: 'shops'
	},
},{ 
  timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } 
})
export const ShoppingHistories = model('shopping_histories', shopping_historiesSchema)