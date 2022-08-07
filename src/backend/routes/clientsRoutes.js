import {
	addNewClient,
	getClients,
	getClientWithID,
	UpdateClient,
	deleteClient,
	loginClient
} from '../controllers/clientsController';

const routes = (app) => {
	app.route('/clients')
		// GET endpoint
		.get(getClients)

		// POST endpoint
		.post(addNewClient);

	app.route('/client/:cid')
		// Get specific id
		.get(getClientWithID)

		// update a specific Email
		.put(UpdateClient)

		// update a specific Email
		.delete(deleteClient);

	app.route('/addClient')
		// POST endpoint
		.post(addNewClient);

	app.route('/loginClient')
		// POST endpoint
		.post(loginClient);
}

export default routes;