import React from 'react';
import axios from 'axios';
import {Col, Row} from 'react-bootstrap';

class ClientData extends React.Component {
	constructor(props) {
		super(props);

		let url = window.location;
		let cidArr = url.pathname.split("/");
		let cid = '';

		if(typeof cidArr !== 'undefined' && cidArr.length >= 3) {
			cid = cidArr[2];
		}

		this.state = {
			firstName: '',
			lastName: '',
			emailAddress: '',
			phone: '',
			showForm1: true,
			showForm2: false,
			showForm3: false,
			showThankYouMsg1: false,
			loginName: '',
			loginPass: '',
			saltRounds: 15,
			homeAddress1: '',
			homeAddress2: '',
			homeCity: '',
			homeState: '',
			homeZip: '',
			mailAddress1: '',
			mailAddress2: '',
			mailCity: '',
			mailState: '',
			mailZip: '',
			clientId: cid.toString()
		};

		this.handleChange = this.handleChange.bind(this);
		this.signup = this.signup.bind(this);
		this.saveClient = this.saveClient.bind(this);
		this.toggleForm = this.toggleForm.bind(this);
	}

	componentDidMount() {
		this.toggleForm('form1');
		if(this.state.clientId !== ''){
			axios.get('http://localhost:4000/client/' + this.state.clientId.toString())
				.then((res) => {
					console.log('res:',res);
					if(res.status === 200)
					{
						this.setState({ firstName		: res.data.user.firstName	 });
						this.setState({ lastName			: res.data.user.lastName	 });
						this.setState({ emailAddress		: res.data.user.emailAddress });
						this.setState({ phone			: res.data.user.phone		 });
						this.setState({ homeAddress1		: res.data.user.homeAddress1 });
						this.setState({ homeAddress2		: res.data.user.homeAddress2 });
						this.setState({ homeCity			: res.data.user.homeCity	 });
						this.setState({ homeState		: res.data.user.homeState	 });
						this.setState({ homeZip			: res.data.user.homeZip		 });
						this.setState({ mailAddress1		: res.data.user.mailAddress1 });
						this.setState({ mailAddress2		: res.data.user.mailAddress2 });
						this.setState({ mailCity			: res.data.user.mailCity	 });
						this.setState({ mailState		: res.data.user.mailState	 });
						this.setState({ mailZip			: res.data.user.mailZip		 });

						this.toggleForm('form1')
					}
				})
				.catch((error) => {
					console.log('error:',error);
				});
		}
	}

	toggleForm = (formName) => {
		switch (formName){
			case 'form1':
				this.setState({ showForm1: true });
				this.setState({ showForm2: false });
				this.setState({ showForm3: false });
			break;
			case 'form2':
				this.setState({ showForm1: false });
				this.setState({ showForm2: true });
				this.setState({ showForm3: false });
			break;
			case 'form3':
				this.setState({ showForm1: false });
				this.setState({ showForm2: false });
				this.setState({ showForm3: true });
			break;
		}
	}

	toggleThankYou1 = () => {
		if(!this.state.showThankYouMsg1){
			this.setState({showThankYouMsg1: true});
			this.setState({ showForm1: false });
			this.setState({ showForm2: false });
			this.setState({ showForm3: false });
		}else{
			this.setState({showThankYouMsg1: false})
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
			case 'homeAddress1':
				this.setState({ homeAddress1: event.target.value });
				break;
			case 'homeAddress2':
				this.setState({ homeAddress2: event.target.value });
				break;
			case 'homeCity':
				this.setState({ homeCity: event.target.value });
				break;
			case 'homeState':
				this.setState({ homeState: event.target.value });
				break;
			case 'homeZip':
				this.setState({ homeZip: event.target.value });
				break;
			case 'mailAddress1':
				this.setState({ mailAddress1: event.target.value });
				break;
			case 'mailAddress2':
				this.setState({ mailAddress2: event.target.value });
				break;
			case 'mailCity':
				this.setState({ mailCity: event.target.value });
				break;
			case 'mailState':
				this.setState({ mailState: event.target.value });
				break;
			case 'mailZip':
				this.setState({ mailZip: event.target.value });
				break;
			default:
				console.log(`Sorry, we are out of` + event.target.value + `.`);
		}
	}

	signup(event) {

		event.preventDefault();

		axios.post('http://localhost:4000/addClient', {
				loginName:		this.state.loginName,
				loginPass:		this.state.loginPass,
				firstName:		this.state.firstName,
				lastName:		this.state.lastName,
				emailAddress:	this.state.emailAddress,
				phone:			this.state.phone,
				homeAddress1:	this.state.homeAddress1,
				homeAddress2:	this.state.homeAddress2,
				homeCity:		this.state.homeCity,
				homeState:		this.state.homeState,
				homeZip:		this.state.homeZip,
				mailAddress1:	this.state.mailAddress1,
				mailAddress2:	this.state.mailAddress2,
				mailCity:		this.state.mailCity,
				mailState:		this.state.mailState,
				mailZip:		this.state.mailZip
			})
			.then((response) => {
				if(response.status === 200)
				{
					console.log('hide');
					this.toggleThankYou1();
				}
			})
			.catch((error) => {
				console.log('error:',error);
			});

	}

	saveClient(event) {

		event.preventDefault();

		axios.put('http://localhost:4000/client/' + this.state.clientId.toString(), {
				firstName		:	this.state.firstName,
				lastName		:	this.state.lastName,
				emailAddress	:	this.state.emailAddress,
				phone			:	this.state.phone,
				homeAddress1	:	this.state.homeAddress1,
				homeAddress2	:	this.state.homeAddress2,
				homeCity		:	this.state.homeCity,
				homeState		:	this.state.homeState,
				homeZip			:	this.state.homeZip,
				mailAddress1	:	this.state.mailAddress1,
				mailAddress2	:	this.state.mailAddress2,
				mailCity		:	this.state.mailCity,
				mailState		:	this.state.mailState,
				mailZip			:	this.state.mailZip
			})
			.then((response) => {

				if(response.status === 200)
				{
					let formId = event.target.id;
					switch(formId.toString()) {
						case 'addClientForm1':
							this.toggleForm('form2')
							break;
						case 'addClientForm2':
							this.toggleForm('form3')
							break;
						case 'addClientForm3':
							this.toggleThankYou1();
							break;
					}
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

				{ this.state.showForm1 ?
					<form name="addClientForm1" id="addClientForm1" noValidate onSubmit={ this.state.clientId === '' ? this.signup : this.saveClient} >
						<Row className="sign-up-form">
							<Col>
								{ this.state.clientId === '' ?
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
								: null }
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
							<Col>
								{ this.state.clientId === '' ?
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
								: null }
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

								{ this.state.clientId === '' ?
									<button type="submit" className="btn btn-primary">Sign me up!!</button>
								:	<button type="submit" className="btn btn-primary">Save</button> }

							</div>
						</Row>
					</form>
				: null }

				{ this.state.showForm2 ?
					<form name="addClientForm2" id="addClientForm2" noValidate onSubmit={this.saveClient}>
						<Row className="sign-up-form">
							<Col>
								<div className="form-group">
									<input type="text"
										   className="form-control"
										   placeholder="Home Address *"
										   id="homeAddress1"
										   required
										   value={this.state.homeAddress1}
										   onChange={this.handleChange}
										   data-validation-required-message="Please enter your home address."  />
									<p className="help-block text-danger">&nbsp;</p>
								</div>
								<div className="form-group">
									<input type="text"
										   className="form-control"
										   placeholder="Home City *"
										   id="homeCity"
										   required
										   value={this.state.homeCity}
										   onChange={this.handleChange}
										   data-validation-required-message="Please enter your home city."  />
									<p className="help-block text-danger">&nbsp;</p>
								</div>
								<div className="form-group">
									<input type="text"
										   className="form-control"
										   placeholder="Home Zip *"
										   id="homeZip"
										   required
										   value={this.state.homeZip}
										   onChange={this.handleChange}
										   data-validation-required-message="Please enter your home zip."  />
									<p className="help-block text-danger">&nbsp;</p>
								</div>
							</Col>
							<Col>
								<div className="form-group">
									<input type="text"
										   className="form-control"
										   placeholder="Home Address2 *"
										   id="homeAddress2"
										   required
										   value={this.state.homeAddress2}
										   onChange={this.handleChange}
										   data-validation-required-message="Please enter your home address2." />
									<p className="help-block text-danger">&nbsp;</p>
								</div>
								<div className="form-group">
									<input type="text"
										   className="form-control"
										   placeholder="Home State *"
										   id="homeState"
										   required
										   value={this.state.homeState}
										   onChange={this.handleChange}
										   data-validation-required-message="Please enter your home state." />
									<p className="help-block text-danger">&nbsp;</p>
								</div>
							</Col>
							<div className="clearfix">&nbsp;</div>
							<div className="col-lg-12 text-center">
								<div id="success">&nbsp;</div>
								<button type="submit" className="btn btn-primary">Save</button>
							</div>
						</Row>
					</form>
				: null }

				{ this.state.showForm3 ?
					<form name="addClientForm3" id="addClientForm3" noValidate onSubmit={this.saveClient}>
						<Row className="sign-up-form">
							<Col>
								<div className="form-group">
									<input type="text"
										   className="form-control"
										   placeholder="Mail Address *"
										   id="mailAddress1"
										   required
										   value={this.state.mailAddress1}
										   onChange={this.handleChange}
										   data-validation-required-message="Please enter your mail address."  />
									<p className="help-block text-danger">&nbsp;</p>
								</div>
								<div className="form-group">
									<input type="text"
										   className="form-control"
										   placeholder="Mail City *"
										   id="mailCity"
										   required
										   value={this.state.mailCity}
										   onChange={this.handleChange}
										   data-validation-required-message="Please enter your mail city."  />
									<p className="help-block text-danger">&nbsp;</p>
								</div>
								<div className="form-group">
									<input type="text"
										   className="form-control"
										   placeholder="Mail Zip *"
										   id="mailZip"
										   required
										   value={this.state.mailZip}
										   onChange={this.handleChange}
										   data-validation-required-message="Please enter your mail zip."  />
									<p className="help-block text-danger">&nbsp;</p>
								</div>
							</Col>
							<Col>
								<div className="form-group">
									<input type="text"
										   className="form-control"
										   placeholder="Mail Address2 *"
										   id="mailAddress2"
										   required
										   value={this.state.mailAddress2}
										   onChange={this.handleChange}
										   data-validation-required-message="Please enter your mail address2." />
									<p className="help-block text-danger">&nbsp;</p>
								</div>
								<div className="form-group">
									<input type="text"
										   className="form-control"
										   placeholder="Mail State *"
										   id="mailState"
										   required
										   value={this.state.mailState}
										   onChange={this.handleChange}
										   data-validation-required-message="Please enter your mail state." />
									<p className="help-block text-danger">&nbsp;</p>
								</div>
							</Col>
							<div className="clearfix">&nbsp;</div>
							<div className="col-lg-12 text-center">
								<div id="success">&nbsp;</div>
								<button type="submit" className="btn btn-primary">Save</button>
							</div>
						</Row>
					</form>
					: null }

				{ this.state.showThankYouMsg1 ?
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
