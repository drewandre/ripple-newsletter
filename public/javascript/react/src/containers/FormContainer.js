import React, { Component } from 'react';
import RegisterForm from './RegisterForm';

export default class FormContainer extends Component {
	constructor(props) {
		super(props);
		this.state = { signingUp: false, loading: false, thankYou: false };
		this.startSigningUp = this.startSigningUp.bind(this);
		this.startLoader = this.startLoader.bind(this);
		this.thankYou = this.thankYou.bind(this);
	}

	startSigningUp(click) {
		this.setState({ signingUp: !this.state.signingUp });
	}

	thankYou() {
		this.setState({ thankYou: true, signingUp: false, loading: false });
	}

	startLoader(click) {
		click.preventDefault();
		this.setState({ loading: true });
	}

	render() {
		return (
			<div className="landing-page-contact">
				{this.state.thankYou ? (
					<h1 className="landing-page-contact--header">
						Thank you! We sent you an email.
					</h1>
				) : (
					<React.Fragment>
						<a id="contact">
							<h1 className="landing-page-contact--header">
								Let's connect through music.
							</h1>
						</a>
						<p className="landing-page-contact--sub-header">
							Connect with us to stay updated on our progress and get early
							access to our app!
						</p>
						<RegisterForm
							goBack={this.startSigningUp}
							thankYou={this.thankYou}
							startLoader={this.startLoader}
						/>
					</React.Fragment>
				)}
			</div>
		);
	}
}
