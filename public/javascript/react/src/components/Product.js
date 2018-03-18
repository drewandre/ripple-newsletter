import React from 'react';

const Product = props => {
	return (
		<div className="landing-page-product">
			<a id="our-product" />
			<h1 className="landing-page-product--header">
				Connect. Support. Explore.
			</h1>
			{/* <h3 className="landing-page-product--sub-header">
				We imagine a social music experience that bridges the gap between
				artists and fans.
			</h3> */}
			<div className="landing-page-product--cards">
				<div className="landing-page-product--cards--section">
					{/* <i className="fa fa-users fa-3x white" aria-hidden="true" /> */}
					<h3 className="landing-page-product--cards--section--title white">
						Connect with your community
					</h3>
					<h4 className="landing-page-product--cards--section--content white">
						Develop relationships with peers, tastemakers, and your favorite
						artists and through a reimagined, social streaming experience
					</h4>
				</div>
				<div className="landing-page-product--cards--section">
					{/* <i className="fa fa-share-alt fa-3x white" aria-hidden="true" /> */}
					<h3 className="landing-page-product--cards--section--title">
						Support your favorite artists
					</h3>
					<h4 className="landing-page-product--cards--section--content">
						Invest your time, loyalty, and money to support the artists you care
						most about to gain access to exclusive ripple.fx opportunities and
						content
					</h4>
				</div>
				<div className="landing-page-product--cards--section">
					{/* <i className="fa fa-fa-money fa-3x white" aria-hidden="true" /> */}
					<h3 className="landing-page-product--cards--section--title">
						Explore new music
					</h3>
					<h4 className="landing-page-product--cards--section--content">
						Use our innovative tools to discover music based on what you want to
						hear, when you want it - leveraging the power of the ripple.fx
						community and your individual preferences
					</h4>
				</div>
			</div>
			<a id="contact" />
		</div>
	);
};

export default Product;
