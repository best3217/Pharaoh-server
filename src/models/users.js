import { Schema, model } from 'mongoose'
import bcrypt from 'bcrypt-nodejs'
import { getTimeZone } from '../controllers/baseController'
const usersSchema = new Schema({
	permissions_id: {
		type: Schema.Types.ObjectId,
		required: true,
		ref: 'permissions'
	},
	teams_id: {
		type: Schema.Types.ObjectId,
		ref: 'teams'
	},
	email: {
		type: String
	},
	password: {
		type: String
	},
	username: {
		type: String
	},
	firstname: {
		type: String,
		default: ''
	},
	lastname: {
		type: String,
		default: ''
	},
	phone: {
		type: Number
	},
	birthday: {
		type: Date
	},
	gold: {
		type: Number,
		default: 200000
	},
	crown: {
		type: Number,
		default: 100
	},
	station: {
		type: Number,
		default: 0
	},
	level: {
		type: Number,
		default: 0
	},
	royal_league: {
		type: Number
	},
	loyalty_points: {
		type: Number
	},
	friends: {
		type: Array
    },
	status: {
		type: String,
		default: 'allow'
	},
	createdAt:{
		type: Date
	},
	updatedAt:{
		type: Date
	}
})

usersSchema.pre('save', function (next) {
  const user = this
  bcrypt.genSalt(10, (err, salt) => {
    if (err) { return next(err) }
    bcrypt.hash(user.password, salt, null, (err, hash) => {
      if (err) { return next(err) }
      user.password = hash
	  user.createdAt = getTimeZone()
	  user.updatedAt = getTimeZone()
      next()
    })
  })
})

usersSchema.methods.comparePassword = function (candidatePassword, callback) {
  bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
    if (err) { return callback(err) }
    callback(null, isMatch)
  })
}

usersSchema.methods.validPassword = function (password, encrypted) {
	return bcrypt.compareSync(password, encrypted);
}

export const Users = model('users', usersSchema)