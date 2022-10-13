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
			validated: false,
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
						this.setState({ firstName			: res.data.user.firstName	 });
						this.setState({ lastName			: res.data.user.lastName	 });
						this.setState({ emailAddress		: res.data.user.emailAddress });
						this.setState({ phone				: res.data.user.phone		 });
						this.setState({ homeAddress1		: res.data.user.homeAddress1 });
						this.setState({ homeAddress2		: res.data.user.homeAddress2 });
						this.setState({ homeCity			: res.data.user.homeCity	 });
						this.setState({ homeState			: res.data.user.homeState	 });
						this.setState({ homeZip			: res.data.user.homeZip		 });
						this.setState({ mailAddress1		: res.data.user.mailAddress1 });
						this.setState({ mailAddress2		: res.data.user.mailAddress2 });
						this.setState({ mailCity			: res.data.user.mailCity	 });
						this.setState({ mailState			: res.data.user.mailState	 });
						this.setState({ mailZip			: res.data.user.mailZip		 });
						this.setState({ validated			: res.data.user.validated	 });

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
			this.setState({showThankYouMsg1: false});
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
		const form = event.currentTarget;

		if (form.checkValidity() === false) {
			event.stopPropagation();
			this.setState({validated: true});
		}else{
			this.setState({validated: false});

			axios.post('http://localhost:4000/addClient', {
					loginName: this.state.loginName,
					loginPass: this.state.loginPass,
					firstName: this.state.firstName,
					lastName: this.state.lastName,
					emailAddress: this.state.emailAddress,
					phone: this.state.phone,
					homeAddress1: this.state.homeAddress1,
					homeAddress2: this.state.homeAddress2,
					homeCity: this.state.homeCity,
					homeState: this.state.homeState,
					homeZip: this.state.homeZip,
					mailAddress1: this.state.mailAddress1,
					mailAddress2: this.state.mailAddress2,
					mailCity: this.state.mailCity,
					mailState: this.state.mailState,
					mailZip: this.state.mailZip
				})
				.then((response) => {
					if (response.status === 200) {
						this.toggleThankYou1();
					}
				})
				.catch((error) => {
					console.log('error:', error);
				});
		}
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
				{ this.state.showForm1 ?
					<Form name="addClientForm1" id="addClientForm1" noValidate validated={this.state.validated} onSubmit={ this.state.clientId === '' ? this.signup : this.saveClient} >
						<Row className="sign-up-form">
							<Col>
								<p className="main-text">
									Excited to have you on board!!!<br />
									Please fill out the following to get started!<br />
								</p>
							</Col>
						</Row>
						<Row className="sign-up-form">
							<Col>
								{ this.state.clientId === '' ?
									<Form.Group as={Col} md="12" id="validationUsername">
										<Form.Label>Username *</Form.Label>
										<InputGroup hasValidation>
											<InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
											<Form.Control
												type="text"
												placeholder="Username *"
												aria-describedby="inputGroupPrepend"
												required
												id="loginName"
												value={this.state.loginName}
												onChange={this.handleChange}
											/>
											<Form.Control.Feedback>Looks good!</Form.Control.Feedback>
											<Form.Control.Feedback type="invalid">
												Please enter your username.
											</Form.Control.Feedback>
										</InputGroup>
									</Form.Group>
								: null }
								<Form.Group as={Col} md="12" id="validationFirstname">
									<Form.Label>First name *</Form.Label>
									<Form.Control
										required
										type="text"
										placeholder="First Name *"
										value={this.state.firstName}
										onChange={this.handleChange}
										id="firstName"
									/>
									<Form.Control.Feedback>Looks good!</Form.Control.Feedback>
									<Form.Control.Feedback type="invalid">
										Please enter your first name.
									</Form.Control.Feedback>
								</Form.Group>
								<Form.Group as={Col} md="12" id="validationPhone">
									<Form.Label>Phone number *</Form.Label>
									<Form.Control
										required
										type="text"
										placeholder="Phone *"
										value={this.state.phone}
										onChange={this.handleChange}
										id="phone"
									/>
									<Form.Control.Feedback>Looks good!</Form.Control.Feedback>
									<Form.Control.Feedback type="invalid">
										Please enter your phone number.
									</Form.Control.Feedback>
								</Form.Group>
							</Col>
							<Col>
								{ this.state.clientId === '' ?
									<Form.Group as={Col} md="12" id="validationPasscode">
										<Form.Label>Passcode *</Form.Label>
										<Form.Control
											required
											type="text"
											placeholder="Passcode *"
											value={this.state.loginPass}
											onChange={this.handleChange}
											id="loginPass"
										/>
										<Form.Control.Feedback>Looks good!</Form.Control.Feedback>
										<Form.Control.Feedback type="invalid">
											Please enter your pass code.
										</Form.Control.Feedback>
									</Form.Group>
								: null }
								<Form.Group as={Col} md="12" id="validationLastname">
									<Form.Label>Last name *</Form.Label>
									<Form.Control
										required
										type="text"
										placeholder="Last Name *"
										value={this.state.lastName}
										onChange={this.handleChange}
										id="lastName"
									/>
									<Form.Control.Feedback>Looks good!</Form.Control.Feedback>
									<Form.Control.Feedback type="invalid">
										Please enter your last name.
									</Form.Control.Feedback>
								</Form.Group>
								<Form.Group as={Col} md="12" id="validationLastname">
									<Form.Label>Email Address *</Form.Label>
									<Form.Control
										required
										type="email"
										placeholder=" Email Address *"
										value={this.state.emailAddress}
										onChange={this.handleChange}
										id="emailAddress"
									/>
									<Form.Control.Feedback>Looks good!</Form.Control.Feedback>
									<Form.Control.Feedback type="invalid">
										Please enter your email address.
									</Form.Control.Feedback>
								</Form.Group>
							</Col>
							<div className="clearfix">&nbsp;</div>
							<div className="col-lg-12 text-center">
								<div id="success">&nbsp;</div>

								{ this.state.clientId === '' ?
									<button type="submit" className="btn btn-primary">Sign me up!!</button>
								:	<button type="submit" className="btn btn-primary">Save</button> }

							</div>
						</Row>
					</Form>
				: null }

				{ this.state.showForm2 ?
					<Form name="addClientForm2" id="addClientForm2" noValidate onSubmit={this.saveClient}>
						<Row className="sign-up-form">
							<Col>
								<p className="main-text">
									Excited to have you on board!!!<br />
									Please fill out the following to get started!<br />
								</p>
							</Col>
						</Row>
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
					</Form>
				: null }

				{ this.state.showForm3 ?
					<Form name="addClientForm3" id="addClientForm3" noValidate onSubmit={this.saveClient}>
						<Row className="sign-up-form">
							<Col>
								<p className="main-text">
									Excited to have you on board!!!<br />
									Please fill out the following to get started!<br />
								</p>
							</Col>
						</Row>
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
					</Form>
				: null }

				{ this.state.showThankYouMsg1 ?
					<div id="thankyoumsg" className="sign-up-form thank-you">
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
