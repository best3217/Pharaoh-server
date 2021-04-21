import { Schema, model } from 'mongoose'
const kings_pathsSchema = new Schema({
	station: {
		type: Number
	},
	title: {
		type: String
	},
	bonus: {
		type: Number
	},
	remaining_time: {
		type: Number
	},
	crown: {
		type: Number
	},
	total_spins: {
		type: Number
	},
	total_win: {
		type: Number
	},
	once_win: {
		type: Number
	},
	wagering: {
		type: Number
	},
	least: {
		type: Number
	},
},{ 
  timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } 
})
export const KingsPaths = model('kings_paths', kings_pathsSchema)