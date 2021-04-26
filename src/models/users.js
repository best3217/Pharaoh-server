import { Schema, model } from 'mongoose'
import bcrypt from 'bcrypt-nodejs'
import { getTimeZone, get_player_id } from '../controllers/baseController'
const usersSchema = new Schema({
	permissions_id: {
		type: Schema.Types.ObjectId,
		required: true,
		ref: 'permissions'
	},
	pid:{
		type: Number
	},
	team_members_id: {
		type: Schema.Types.ObjectId,
		ref: 'team_members'
	},
	teams_id: {
		type: Schema.Types.ObjectId,
		ref: 'teams'
	},
	levels_id: {
		type: Schema.Types.ObjectId,
		ref: 'levels'
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
		type: Number,
		default: 0
	},
	birthday: {
		type: Date,
		default: Date.now
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
	total_win: {
		type: Number
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
		default: 'active'
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
	  user.pid = get_player_id()
      next()
    })
  })
})

usersSchema.methods.generateHash = function (password) {
	return bcrypt.hashSync(password, bcrypt.genSaltSync(10))
}

usersSchema.methods.comparePassword = function (candidatePassword, callback) {
  bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
    if (err) { return callback(err) }
    callback(null, isMatch)
  })
}

usersSchema.methods.validPassword = function (password, encrypted) {
	return bcrypt.compareSync(password, encrypted)
}

export const Users = model('users', usersSchema)