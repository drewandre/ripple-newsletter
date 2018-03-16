import React, { Component } from 'react';

import FormContainer from './FormContainer';
import Header from '../components/Header';
import Team from '../components/Team';
import Product from '../components/Product';
import Hero from '../components/Hero';
import Footer from '../components/Footer';

class App extends Component {
	render() {
		return (
			<React.Fragment>
				<Header />
				<Hero />
				<Product />
				<FormContainer />
				<Team />
				<Footer />
			</React.Fragment>
		);
	}
}

export default App;
