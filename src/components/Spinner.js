import React from 'react';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';


class SpinnerButton extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
		};
	}

	componentDidMount() {

	}


	render() {
		return (
			<>
				{/*<Button variant="primary" disabled>*/}
				{/*	<Spinner*/}
				{/*		as="span"*/}
				{/*		animation="border"*/}
				{/*		size="sm"*/}
				{/*		role="status"*/}
				{/*		aria-hidden="true"*/}
				{/*	/>*/}
				{/*	<span className="visually-hidden">Loading...</span>*/}
				{/*</Button>{' '}*/}
				<Button variant="primary" disabled>
					<Spinner
						as="span"
						animation="grow"
						size="sm"
						role="status"
						aria-hidden="true"
					/>
					Processing...
				</Button>
			</>
		);
	}
}
export default SpinnerButton;
