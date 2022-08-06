import mongoose from 'mongoose';
import { ClientSchema } from '../models/clientsModel';
import config from '../../config';

const Client = mongoose.model('Clients', ClientSchema);
const { MongoClient } = require("mongodb");
const cl = new MongoClient( config.mongodbUri );


export const addNewClient = (req, res) => {

	let newClient = new Client(req.body);
	async function run() {
		try {
			await cl.connect();
			const db = cl.db('after-death');
			const col = db.collection('clients');

			col.insertOne(newClient)
			return 1;

		} catch (err) {
			console.log(err.stack);
			return 0;
		}
		finally {
			await client.close();
		}
	}
	run().catch(console.dir);

	newClient.save((err, Client) => {
		// console.log('save');
		if (err) {
			res.send(err);
		}
		res.json(Client);
	});
};

export const getClients = (req, res) => {
	console.log('getClients');
	Client.find({},(err, Client) => {
		if (err) {
			res.send(err);
		}
		res.json(Client);
	});
};

export const getClientWithID = (req, res) => {
	Client.findById(req.params.ClientId,(err, Client) => {
		if (err) {
			res.send(err);
		}
		res.json(Client);
	});
};

export const UpdateClient = (req, res) => {
	Client.findOneAndUpdate({ _id: req.params.ClientId}, req.body, {new: true}, (err, Client) => {
		if (err) {
			res.send(err);
		}
		res.json(Client);
	});
};

export const deleteClient = (req, res) => {
	Client.remove({ _id: req.params.ClientId},(err, Client) => {
		if (err) {
			res.send(err);
		}
		res.json({ message: 'Successfully deleted Client'});
	});
};

export const loginClient = (req, res) => {
	let username = req.body.loginName.trim();
	let password = req.body.loginPass.trim();

	async function run() {
		try {
			await cl.connect();
			const db = cl.db('after-death');
			const col = db.collection('clients');

			col.findOne({loginName : username}).then(function(user, error) {
				if (error) {
					res.send({error: true});
				} else if (!user) {
					res.send({error: true});
				} else {
					ClientSchema.comparePassword(password, user,function(matchError, isMatch) {
						if (matchError) {
							res.send({error: true});
						} else if (!isMatch) {
							res.send({error: true});
						} else {
							res.send({success: true});
						}
					})
				}
			});

		} catch (err) {
			console.log(err.stack);
			return 0;
		}
		finally {
			// await cl.close();
		}
	}
	run().catch(console.dir);
}
