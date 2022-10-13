import mongoose from 'mongoose';
import bcrypt from "bcryptjs";

const Schema = mongoose.Schema;

export const ClientSchema = new Schema({
	loginName: {
		type: String,
		required: true,
		trim: true
	},
	loginPass: {
		type: String,
		required: true
	},
	firstName: {
		type: String,
		required: true,
		trim: true
	},
	lastName: {
		type: String,
		required: true,
		trim: true
	},
	emailAddress: {
		type: String,
		required: true,
		trim: true
	},
	phone: {
		type: String,
		trim: true
	},
	homeAddress1: {
		type: String,
		trim: true
	},
	homeAddress2: {
		type: String,
		trim: true
	},
	homeCity: {
		type: String,
		trim: true
	},
	homeState: {
		type: String,
		trim: true
	},
	homeZip: {
		type: String,
		trim: true
	},
	mailAddress1: {
		type: String,
		trim: true
	},
	mailAddress2: {
		type: String,
		trim: true
	},
	mailCity: {
		type: String,
		trim: true
	},
	mailState: {
		type: String,
		trim: true
	},
	mailZip: {
		type: String,
		trim: true
	},
	createDate: {
		type: Date,
		default: Date.now
	}
});

ClientSchema.pre("save",function(next) {
	const user = this
	if (this.isModified("loginPass") || this.isNew) {
		bcrypt.genSalt(10, function (saltError, salt) {
			if (saltError) {
				return next(saltError)
			} else {
				bcrypt.hash(user.loginPass, salt, function(hashError, hash) {
					if (hashError) {
						return next(hashError)
					}
					user.loginPass = hash
					next()
				})
			}
		})
	} else {
		return next()
	}
});

ClientSchema.comparePassword = function(password, user, callback) {
	bcrypt.compare(password, user.loginPass, function (error, isMatch) {
		if (error) {
			return callback(error)
		} else {
			callback(null, isMatch)
		}
	})
}