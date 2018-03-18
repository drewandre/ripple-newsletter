import React from 'react';

const Hero = props => {
	return (
		<div className="landing-page-content">
			<div className="landing-page-prose--container">
				<h1 className="landing-page-prose--header">ripple.fx</h1>
				<h3 className="landing-page-prose--text">
					We are a Boston-based team of engineers and musicians working to
					revolutionize the way you experience music.
				</h3>
				<h3 className="landing-page-prose--text">
					We are developing the first social music marketplace to bridge the gap
					between fans and artists.
				</h3>
				<a href="#contact" className="cta-button--small-screen">
					REQUEST EARLY ACCESS
				</a>
			</div>
			<div id="canvas--container">
				<div id="particles-js" />
				<div id="particles-js--overlay" />
				<div id="landing-page-team--overlay" />
			</div>
			<a href="#our-product" className="bounce">
				<i className="fa fa-caret-down fa-5x" />
			</a>
		</div>
	);
};

export default Hero;
