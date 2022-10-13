import React from 'react';
import axios from 'axios';
import {Col, Row, Alert, Form, InputGroup} from 'react-bootstrap';
import { Navigate } from "react-router-dom"

class SignIn extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			loginName: '',
			loginPass: '',
			showError: false,
			navTo: false,
			clientId: ''
		};

		this.handleSubmit = this.handleSubmit.bind(this);
		this.setError = this.setError.bind(this);
		this.setNavigation = this.setNavigation.bind(this);
	}

	handleSubmit(event) {

		event.preventDefault();

		axios.post('http://localhost:4000/loginClient', {
			loginName: event.target.loginName.value,
			loginPass: event.target.loginPass.value
		})
		.then((res) => {
			console.log('response:',res);
			if(res.status === 200 && res.data.success === true)
			{
				console.log('success');
				this.setError(false);
				this.setNavigation({navTo: true});
				this.setState({clientId: res.data.id})
			}
			else
			{
				console.log('error');
				this.setError(true);
			}
		})
		.catch((error) => {
			console.log('error:',error);
			this.setError(true);
		});

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

	Child = () => {
		return (this.state.clientId);
	}

	render() {
		return (
			<>
				<p className="main-text">
					Welcome Back!!!<br />
					Please sign in to continue!<br />
				</p>

				{ this.state.navTo
					?
					<Navigate to={{
						pathname:'/client/' + this.state.clientId,
						state: {clientId:this.state.clientId}
					}} />
					:
					<form name="signInForm" id="signInForm" noValidate onSubmit={this.handleSubmit}>
						<Row className="sign-up-form sign-in-alert ">
							<Col md={12}>
								<div className="form-group">
									<InputGroup className="mb-3">
										<InputGroup.Text id="basic-addon3">
											Your Login Name *
										</InputGroup.Text>
										<Form.Control id="loginName" aria-describedby="basic-addon3" required />
									</InputGroup>
									{/*<input type="text"*/}
									{/*	   className="form-control"*/}
									{/*	   placeholder="Your Login Name *"*/}
									{/*	   id="loginName"*/}
									{/*	   required*/}
									{/*	   data-validation-required-message="Please enter your login name." />*/}
									<p className="help-block text-danger">&nbsp;</p>
								</div>
								<div className="form-group">
									<input type="text"
										   className="form-control"
										   placeholder="Your Login PassCode *"
										   id="loginPass"
										   required
										   data-validation-required-message="Please enter your pass code." />
									<p className="help-block text-danger">&nbsp;</p>
								</div>
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
					</form>
				}
			</>
		);
	}
}
export default SignIn;
