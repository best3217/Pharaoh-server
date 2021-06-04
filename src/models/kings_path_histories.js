import { Schema, model } from 'mongoose'
const kings_path_historiesSchema = new Schema({
	users: {
		type: Schema.Types.ObjectId,
		required: true,
		ref: 'users'
	},
	kings_paths: {
		type: Schema.Types.ObjectId,
		required: true,
		ref: 'kings_paths'
	},
},{ 
  timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } 
})
export const KingsPathHistories = model('kings_path_histories', kings_path_historiesSchema)