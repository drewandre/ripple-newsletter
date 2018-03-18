import React, { Component } from 'react';
import { CubeGrid } from 'better-react-spinkit';
import RegisterForm from './RegisterForm';

export default class FormContainer extends Component {
	constructor() {
		super();
		this.state = { signingUp: false, loading: false };
		this.startSigningUp = this.startSigningUp.bind(this);
		this.startLoader = this.startLoader.bind(this);
	}

	startSigningUp(click) {
		this.setState({ signingUp: !this.state.signingUp });
	}

	startLoader(click) {
		click.preventDefault();
		this.setState({ loading: true });
	}

	render() {
		return (
			<div className="landing-page-contact">
				<a id="contact">
					<h1 className="landing-page-contact--header">
						Let's connect through music.
					</h1>
				</a>
				{this.state.signingUp ? (
					<RegisterForm
						goBack={this.startSigningUp}
						startLoader={this.startLoader}
					/>
				) : this.state.loading ? (
					// <div className="sign-up">
					<div>
						<CubeGrid id="spinner" size={100} color="#fff" />
					</div>
				) : (
					<React.Fragment>
						<p className="landing-page-contact--sub-header">
							Connect with us to stay updated on our progress and get early
							access to our app!
						</p>
						<div className="sign-up">
							<a
								// href="/auth/spotify"
								id="spotify-button"
								onClick={this.startLoader}
							>
								CONNECT THROUGH SPOTIFY
							</a>
							<a id="email-button" onClick={this.startSigningUp}>
								CONNECT THROUGH EMAIL
							</a>
						</div>
					</React.Fragment>
				)}
			</div>
		);
	}
}
