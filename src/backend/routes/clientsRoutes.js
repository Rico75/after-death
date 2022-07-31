import {
	addNewClient,
	getClients,
	getClientWithID,
	UpdateClient,
	deleteClient
} from '../controllers/clientsController';

const routes = (app) => {
	app.route('/clients')
		// GET endpoint
		.get(getClients)

		// POST endpoint
		.post(addNewClient);

	app.route('/client/:ClientId')
		// Get specific Email
		.get(getClientWithID)

		// update a specific Email
		.put(UpdateClient)

		// update a specific Email
		.delete(deleteClient);

	app.route('/addClient')
		// POST endpoint
		.post(addNewClient);
}

export default routes;