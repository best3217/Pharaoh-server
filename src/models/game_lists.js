import { Schema, model } from 'mongoose'
const game_listsSchema = new Schema({
	providers_id: {
		type: Schema.Types.ObjectId,
		required: true,
		ref: 'providers'
	},
	ID: {
		type: String
	},
	title: {
		type: String
	},
	type: {
		type: String
	},
	image: {
		type: String
	},
	order: {
		type: Number
	},
	status: {
		type: Boolean
	},
	level: {
		type: Number,
		default: 0
	},
},{ 
  timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } 
})
game_listsSchema.pre('find', function () {
	this.populate('providers_id',["LAUNCHURL"])
})
export const GameLists = model('game_lists', game_listsSchema)