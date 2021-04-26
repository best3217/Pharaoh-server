import mongoose, { Schema } from 'mongoose'
const teamsSchema = new Schema({
	team: {
		type: String
	},
	league: {
		type: String,
		default: 'stone'
	},
	space: {
		type: Number
	},
	joinAt: {
		type: Number
	},
	rank: {
		type: Number,
		default: 0
	},
	team_score: {
		type: Number,
		default: 0
	},
	places: {
		type: Number,
		default: 0
	},
	league_score: {
		type: Number,
		default: 0
	},
	gold: {
		type: Number,
		default: 5000000
	},
	crowns: {
		type: Number,
		default: 10
	}
},{ 
  timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } 
})
export const Teams = mongoose.model('teams', teamsSchema)