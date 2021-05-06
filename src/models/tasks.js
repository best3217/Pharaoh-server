import { model, Schema } from 'mongoose'
const tasksSchema = new Schema({
	title: {
		type: String
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
export const Tasks = model('tasks', tasksSchema)