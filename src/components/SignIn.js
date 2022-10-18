import React from 'react';
import axios from 'axios';
import {Col, Row, Alert, Form, InputGroup} from 'react-bootstrap';
import { Navigate } from "react-router-dom"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEye, faEyeSlash} from "@fortawesome/free-solid-svg-icons";

class SignIn extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			loginName: '',
			loginPass: '',
			showError: false,
			showLoginPass: false,
			validated: false,
			navTo: false,
			clientId: ''
		};

		this.handleSubmit = this.handleSubmit.bind(this);
		this.setError = this.setError.bind(this);
		this.setNavigation = this.setNavigation.bind(this);
	}

	handleSubmit(event) {

		event.preventDefault();
		const form = event.currentTarget;

		if (form.checkValidity() === false) {
			event.stopPropagation();
			this.setState({validated: true});
		}else {
			this.setState({validated: false});

			axios.post('http://localhost:4000/loginClient', {
					loginName: event.target.loginName.value,
					loginPass: event.target.loginPass.value
				})
				.then((res) => {
					console.log('response:', res);
					if (res.status === 200 && res.data.success === true) {
						console.log('success');
						this.setError(false);
						this.setNavigation({navTo: true});
						this.setState({clientId: res.data.id})
					} else {
						console.log('error');
						this.setError(true);
					}
				})
				.catch((error) => {
					console.log('error:', error);
					this.setError(true);
				});
		}
	}

	setError = (bool) => {
		if(bool){
			this.setState({showError: true})
		}else{
			this.setState({showError: false})
		}
	}

	setNavigation = (bool) => {
		if(bool){
			this.setState({navTo: true})
		}else{
			this.setState({navTo: false})
		}
	}

	toggleEye = () => {
		if(this.state.showLoginPass === false) {
			this.setState({ showLoginPass: true });
		}else{
			this.setState({ showLoginPass: false });
		}
	}

	Child = () => {
		return (this.state.clientId);
	}

	render() {
		return (
			<>
				{ this.state.navTo
					?
					<Navigate to={{
						pathname:'/client/' + this.state.clientId,
						state: {clientId:this.state.clientId}
					}} />
					:
					<Form name="signInForm" id="signInForm" noValidate validated={this.state.validated} onSubmit={this.handleSubmit}>
						<Row className="sign-up-form sign-in-alert ">
							<Col>
								<p className="main-text">
									Welcome Back!!!<br />
									Please sign in to continue!<br />
								</p>
							</Col>
						</Row>
						<Row className="sign-up-form sign-in-alert ">
							<Col>
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
										/>
										<Form.Control.Feedback>Looks good!</Form.Control.Feedback>
										<Form.Control.Feedback type="invalid">
											Please enter your username.
										</Form.Control.Feedback>
									</InputGroup>
								</Form.Group>

								<Form.Group as={Col} md="12" id="validationPasscode">
									<Form.Label>Passcode *</Form.Label>
									<InputGroup hasValidation>
										<Form.Control
											required
											type={this.state.showLoginPass ? "text" : "password"}
											placeholder="Passcode *"
											id="loginPass"
											aria-describedby="inputGroupAppend"
										/>
										<InputGroup.Text id="inputGroupAppend">
											{
												this.state.showLoginPass === true
													?
													<FontAwesomeIcon icon={faEye} onClick={this.toggleEye} />
													:
													<FontAwesomeIcon icon={faEyeSlash} onClick={this.toggleEye} />
											}
										</InputGroup.Text>
										<Form.Control.Feedback>Looks good!</Form.Control.Feedback>
										<Form.Control.Feedback type="invalid">
											Please enter your pass code.
										</Form.Control.Feedback>
									</InputGroup>
								</Form.Group>

								{ this.state.showError ?
									<Alert variant="danger" onClose={() => this.setError(false)} dismissible>
										<Alert.Heading>Oh snap! There is a mismatch!</Alert.Heading>
										<p>
											This combination of Login Name and Login PassCode, do not match
											our records.<br /><br />
											Please verify the information and try again.<br /><br />
											Thank you!
										</p>
									</Alert>
								: null }
							</Col>
							<div className="clearfix">&nbsp;</div>
							<div className="col-lg-12 text-center">
								<div id="success">&nbsp;</div>
								<button type="submit" className="btn btn-primary">Sign me in!!</button>
							</div>
						</Row>
					</Form>
				}
			</>
		);
	}
}
export default SignIn;
