import React, { Component } from 'react';
import { CubeGrid } from 'better-react-spinkit';
import RegisterForm from './RegisterForm';

export default class FormContainer extends Component {
	constructor() {
		super();
		this.state = { signingUp: false };
		this.startSigningUp = this.startSigningUp.bind(this);
	}

	startSigningUp(click) {
		this.setState({ signingUp: !this.state.signingUp });
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
					<RegisterForm goBack={() => this.setState({ signingUp: false })} />
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
								// onClick={this.startLoader}
							>
								SIGN UP THROUGH SPOTIFY
							</a>
							{/* <a id="soundcloud-button" onClick={this.startLoader}>
								SIGN UP THROUGH SOUNDCLOUD
							</a> */}
							<a id="email-button" onClick={this.startSigningUp}>
								SIGN UP THROUGH EMAIL
							</a>
						</div>
					</React.Fragment>
				)}
			</div>
		);
	}
}
