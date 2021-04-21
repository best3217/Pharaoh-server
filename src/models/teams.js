import mongoose, { Schema } from 'mongoose'
const teamsSchema = new Schema({
	rank: {
		type: Number
	},
	team: {
		type: String
	},
	team_score: {
		type: Number
	},
	places: {
		type: Number
	},
	league_score: {
		type: Number
	},
	gold: {
		type: Number
	},
	crowns: {
		type: Number
	},
},{ 
  timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } 
})
export const Teams = mongoose.model('teams', teamsSchema)