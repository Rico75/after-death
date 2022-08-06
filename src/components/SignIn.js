import React from 'react';
import axios from 'axios';
import {Col, Row} from 'react-bootstrap';

class SignIn extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			loginName: '',
			loginPass: ''
		};

		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleSubmit(event) {

		event.preventDefault();

		axios.post('http://localhost:4000/loginClient', {
			loginName: event.target.loginName.value,
			loginPass: event.target.loginPass.value
		})
		.then((res) => {
			console.log('response:',res);
			if(res.status === 200 && res.data.error !== true)
			{
				console.log('success');
			}
			else
			{
				console.log('error',res.data.error);
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
					Welcome Back!!!<br />
					Please sign in to continue!<br />
				</p>

				<form name="signInForm" id="signInForm" noValidate onSubmit={this.handleSubmit}>
					<Row className="sign-up-form">
						<Col md={6}>
							<div className="form-group">
								<input type="text"
									   className="form-control"
									   placeholder="Your Login Name *"
									   id="loginName"
									   required
									   data-validation-required-message="Please enter your login name." />
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
						</Col>
						<div className="clearfix">&nbsp;</div>
						<div className="col-lg-12 text-center">
							<div id="success">&nbsp;</div>
							<button type="submit" className="btn btn-primary">Sign me in!!</button>
						</div>
					</Row>
				</form>
			</>
		);
	}
}
export default SignIn;
