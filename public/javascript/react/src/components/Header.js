import React from 'react';

const Header = props => {
	return (
		<header className="navigation-container">
			<nav className="navigation-container--items">
				<div className="nav-mobile">
					<a id="nav-toggle">
						<span />
					</a>
				</div>
				<ul className="nav-list">
					<li>
						<a className="disable-link">Newsletter (coming soon)</a>
					</li>
					<li>
						<a href="#our-team">Our Team</a>
					</li>
					<li>
						<a href="#our-product">Our Product</a>
					</li>
					<a href="https://www.instagram.com/ripple.fx/" target="blank">
						<i
							className="fa fa-instagram fa-2x social-media-icon"
							aria-hidden="true"
						/>
					</a>
					<li>
						<a href="#contact" className="cta-button--outline">
							REQUEST EARLY ACCESS
						</a>
					</li>
				</ul>
			</nav>
		</header>
	);
};

export default Header;
