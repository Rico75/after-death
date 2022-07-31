import React from 'react';
import axios from 'axios';
import {Col, Row} from 'react-bootstrap';

class ClientData extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			firstName: '',
			lastName: '',
			emailAddress: '',
			phone: '',
			showForm: true
		};

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	toggleLoader = () => {
		if(!this.state.showForm){
console.log('show:true');
			this.setState({showForm: true})
		}else{
console.log('show:false');
			this.setState({showForm: false})
		}
	}

	handleChange(event) {
		switch (event.target.id) {
			case 'firstName':
				this.setState({ firstName: event.target.value });
				break;
			case 'lastName':
				this.setState({ lastName: event.target.value });
				break;
			case 'emailAddress':
				this.setState({ emailAddress: event.target.value });
				break;
			case 'phone':
				this.setState({ phone: event.target.value });
				break;
			default:
				console.log(`Sorry, we are out of` + event.target.value + `.`);
		}
	}

	handleSubmit(event) {

		event.preventDefault();

		axios.post('http://localhost:4000/addClient', {
				firstName: this.state.firstName,
				lastName: this.state.lastName,
				emailAddress: this.state.emailAddress,
				phone: this.state.phone
			})
			.then((response) => {
				console.log('response:',response);
				if(response.status === 200)
				{
					console.log('hide');
					this.toggleLoader();
				}
			})
			.catch((error) => {
				console.log('error:',error);
			});
	}

	render() {
		return (
			<>
				<p className="main-text">
					Excited to have you on board!!!<br />
					Please fill out the following to get started!<br />
				</p>

					<form name="addClientForm" id="addClientForm" noValidate onSubmit={this.handleSubmit}>
						<Row className="sign-up-form">
							<Col md={6}>
								<div className="form-group">
									<input type="text"
										   className="form-control"
										   placeholder="Your First Name *"
										   id="firstName"
										   required
										   value={this.state.firstName}
										   onChange={this.handleChange}
										   data-validation-required-message="Please enter your first name." />
									<p className="help-block text-danger">&nbsp;</p>
								</div>
								<div className="form-group">
									<input type="text"
										   className="form-control"
										   placeholder="Your Last Name *"
										   id="lastName"
										   required
										   value={this.state.lastName}
										   onChange={this.handleChange}
										   data-validation-required-message="Please enter your last name." />
									<p className="help-block text-danger">&nbsp;</p>
								</div>
								<div className="form-group">
									<input type="tel"
										   className="form-control"
										   placeholder="Your Phone *"
										   id="phone"
										   required
										   value={this.state.phone}
										   onChange={this.handleChange}
										   data-validation-required-message="Please enter your phone number." />
									<p className="help-block text-danger">&nbsp;</p>
								</div>
							</Col>
							<Col md={6}>
								<div className="form-group">
									<input type="email"
										   className="form-control"
										   placeholder="Your Email Address *"
										   id="emailAddress"
										   required
										   value={this.state.emailAddress}
										   onChange={this.handleChange}
										   data-validation-required-message="Please enter your phone number." />
									<p className="help-block text-danger">&nbsp;</p>
								</div>
							</Col>
							<div className="clearfix">&nbsp;</div>
							<div className="col-lg-12 text-center">
								<div id="success">&nbsp;</div>
								<button type="submit" className="btn btn-primary">Sign me up!!
								</button>
							</div>
						</Row>
					</form>

			</>
		);
	}
}
export default ClientData;
