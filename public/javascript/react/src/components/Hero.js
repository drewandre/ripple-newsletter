import React from 'react';

const Hero = props => {
	return (
		<div className="landing-page-content">
			<div className="landing-page-prose--container">
				<h1 className="landing-page-prose--header">ripple.fx</h1>
				<h3 className="landing-page-prose--text">
					We are a Boston-based team of engineers and musicians working to
					revolutionize the way you experience music. We are developing the
					first social music marketplace to bridge the gap between fans and
					artists.
				</h3>
				{/* <h3 className="landing-page-prose--sub-text"> */}
				{/* We're designing a mobile app that streams like Spotify, but shares
					like Instagram. Interested? */}
				{/* Check out what we're building
					<span>
						<a href="#our-product">
							<i
								className="fa fa-caret-down bounce"
								style={{
									position: 'relative',
									left: '23px',
									top: '1px'
								}}
							/>
						</a>
					</span>
				</h3> */}
				<a href="#contact" className="cta-button--small-screen">
					REQUEST EARLY ACCESS
				</a>
			</div>
			<div id="canvas--container">
				<div id="particles-js" />
				<div id="particles-js--overlay" />
				<div id="landing-page-team--overlay" />
			</div>
		</div>
	);
};

export default Hero;
