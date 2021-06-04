import { Schema, model } from 'mongoose'
const providersSchema = new Schema({
	title: {
		type: String
	},
	PROVIDERID: {
		type: String
	},
	LAUNCHURL: {
		type: String
	},
	agregator: {
		type: String
	},
	game_type: {
        type: Array
    },
	currency: {
		type: String
	},
	order: {
		type: Number
	},
	status: {
		type: Boolean
	},
},{ 
  timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } 
})
export const Providers = model('providers', providersSchema)