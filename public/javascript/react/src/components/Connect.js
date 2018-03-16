import React from 'react';
import { CubeGrid } from 'better-react-spinkit';
// import FormContainer from '../containers/FormContainer';

const Connect = props => {
	return (
		<div className="landing-page-contact">
			<a id="contact">
				<h1 className="landing-page-contact--header">
					Let's connect through music.
				</h1>
			</a>
			<p className="landing-page-contact--sub-header">
				This will give us your email and music tastes.
			</p>
			{/* <!-- <p className='landing-page-contact--sub-header'>No spam - we...</p> --> */}
			{/* <p className="landing-page-contact--sub-header" /> */}

			{props.loading ? (
				<div className="sign-up">
					<CubeGrid id="spinner" size={100} color="#fff" />
				</div>
			) : (
				<div className="sign-up">
					<a
						href="/auth/spotify"
						id="spotify-button"
						onClick={props.startLoader}
					>
						CONNECT THROUGH SPOTIFY
					</a>
					<a id="soundcloud-button" to="/" onClick={props.startLoader}>
						CONNECT THROUGH SOUNDCLOUD
					</a>
					<a id="email-button" to="/subscribe">
						CONNECT THROUGH EMAIL
					</a>
				</div>
			)}
		</div>
	);
};

export default Connect;
