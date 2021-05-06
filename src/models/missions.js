import { model, Schema } from 'mongoose'
const missionsSchema = new Schema({
	title: {
		type: String
	},
	games_id: {
		type: Schema.Types.ObjectId,
		required: true,
		ref: 'game_lists'
	},
	tasks_id: {
		type: Schema.Types.ObjectId,
		required: true,
		ref: 'tasks'
	},
	type:{
		type: String
	}, 
	target: {
		type: Number
	},
},{ 
  timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } 
})
export const Missions = model('missions', missionsSchema)