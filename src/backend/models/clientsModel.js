import mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const ClientSchema = new Schema({
	firstName: {
		type: String,
		required: true
	},
	lastName: {
		type: String,
		required: true
	},
	emailAddress: {
		type: String,
		required: true
	},
	phone: {
		type: Number
	},
	createDate: {
		type: Date,
		default: Date.now
	}
});

