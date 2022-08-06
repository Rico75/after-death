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
			showForm: true,
			showThankYouMsg: false,
			loginName: '',
			loginPass: '',
			saltRounds: 15
		};

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	toggleForm = () => {
		if(!this.state.showForm){
			this.setState({showForm: true})
		}else{
			this.setState({showForm: false})
		}
	}

	toggleThankYou = () => {
		if(!this.state.showThankYouMsg){
			this.setState({showThankYouMsg: true})
		}else{
			this.setState({showThankYouMsg: false})
		}
	}

	handleChange(event) {
		switch (event.target.id) {
			case 'loginName':
				this.setState({ loginName: event.target.value });
				break;
			case 'loginPass':
				this.setState({ loginPass: event.target.value });
				break;
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
				loginName: this.state.loginName,
				loginPass: this.state.loginPass,
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
					this.toggleForm();
					this.toggleThankYou();
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
				{ this.state.showForm ?
					<form name="addClientForm" id="addClientForm" noValidate onSubmit={this.handleSubmit}>
						<Row className="sign-up-form">
							<Col md={6}>
								<div className="form-group">
									<input type="text"
										   className="form-control"
										   placeholder="Your Login Name *"
										   id="loginName"
										   required
										   value={this.state.loginName}
										   onChange={this.handleChange}
										   data-validation-required-message="Please enter your login name." />
									<p className="help-block text-danger">&nbsp;</p>
								</div>
								<div className="form-group">
									<input type="text"
										   className="form-control"
										   placeholder="Your Login PassCode *"
										   id="loginPass"
										   required
										   value={this.state.loginPass}
										   onChange={this.handleChange}
										   data-validation-required-message="Please enter your pass code." />
									<p className="help-block text-danger">&nbsp;</p>
								</div>
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
								<button type="submit" className="btn btn-primary">Sign me up!!</button>
							</div>
						</Row>
					</form>
				: null }

				{ this.state.showThankYouMsg ?
					<div name="thankyoumsg" id="thankyoumsg" className="sign-up-form">
						<h5>Thank you for you interest</h5>
						<p>
							You will receive more info soon.
						</p>
					</div>
				: null }
			</>
		);
	}
}
export default ClientData;
