import React, { Component } from 'react';
import { Pulse } from 'better-react-spinkit';

import TextInput from '../components/TextInput';
import Select from '../components/Select';
import ArtistIcons from '../components/ArtistIcons';
import ArtistList from '../components/ArtistList';

const url = 'https://us17.api.mailchimp.com/3.0/lists/a1739a408d/members';

var stringWhiteSpaceTrim = /^\s+|\s+$/g;
var zipcodeRegexp = /^\d{5}$|^\d{5}-\d{4}$/;
var onlyIntegers = /^[0-9]*$/;
var emailRegexp = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

class RegisterForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			loading: false,
			errors: {},
			firstName: '',
			lastName: '',
			email: '',
			age: '',
			zipcode: '',
			subscriberType: '',
			artists: [],
			genres: [],
			searchedArtists: [],
			searchedGenres: [],
			lastKeyPressedTime: 0,
			subscriberTypes: [
				'ocassioanal music listener',
				'active music explorer',
				'tastemaker',
				'casual musician/beats on the side',
				'semi-professional musician',
				'professional musician/performer',
				'music industry professional'
			]
		};

		this.searchArtistsByName = this.searchArtistsByName.bind(this);
		this.handleArtistSelect = this.handleArtistSelect.bind(this);
		this.handleArtistDelete = this.handleArtistDelete.bind(this);

		this.handleFirstName = this.handleFirstName.bind(this);
		this.handleLastName = this.handleLastName.bind(this);
		this.handleEmail = this.handleEmail.bind(this);
		this.handleAge = this.handleAge.bind(this);
		this.handleZipcode = this.handleZipcode.bind(this);
		this.handleSubscriberType = this.handleSubscriberType.bind(this);
		this.handleArtists = this.handleArtists.bind(this);
		this.handleGenres = this.handleGenres.bind(this);

		this.handleFormSubmit = this.handleFormSubmit.bind(this);
		this.handleClearForm = this.handleClearForm.bind(this);

		this.validateFirstName = this.validateFirstName.bind(this);
		this.validateLastName = this.validateLastName.bind(this);
		this.validateEmail = this.validateEmail.bind(this);
		this.validateAge = this.validateAge.bind(this);
		this.validateZipcode = this.validateZipcode.bind(this);
		this.validateSubscriberType = this.validateSubscriberType.bind(this);
		this.validateArtists = this.validateArtists.bind(this);
		this.validateGenres = this.validateGenres.bind(this);
	}

	handleFormSubmit(event) {
		if (event) {
			event.preventDefault();
		}
		if (
			this.validateFirstName(this.state.firstName) &&
			this.validateLastName(this.state.lastName) &&
			this.validateEmail(this.state.email) &&
			this.validateAge(this.state.age) &&
			this.validateZipcode(this.state.zipcode) &&
			this.validateSubscriberType(this.state.subscriberType) &&
			this.validateArtists(this.state.artists) &&
			this.validateGenres(this.state.genres)
		) {
			var artist_string = '';
			for (var i = 0; i < this.state.artists.length; i++) {
				artist_string += this.state.artists[i].id;
				artist_string += ',';
			}
			var payload = {
				email_address: this.state.email,
				status: 'subscribed',
				merge_fields: {
					FIRST_NAME: this.state.firstName,
					LAST_NAME: this.state.lastName,
					ZIPCODE: this.state.zipcode,
					CATEGORY: this.state.subscriberType,
					AGE: this.state.age,
					ARTISTJSON: artist_string
				}
			};
			fetch(`/register`, {
				method: 'POST',
				body: JSON.stringify(payload)
			})
				.then(response => {
					console.log(response);
					this.handleClearForm(event);
					this.props.thankYou();
				})
				.catch(e => {
					this.handleClearForm(event);
					this.props.thankYou();
					console.log('error: ' + e);
				});
		}
	}

	searchArtistsByName(artist_name) {
		this.setState({ loading: true });
		if (Date.now() - this.state.lastKeyPressedTime > 200) {
			fetch(`/spotify/artists/${artist_name}`)
				.then(response => {
					if (response.ok) {
						return response;
					}
				})
				.then(response => response.json())
				.then(body => {
					body = JSON.parse(body);
					body = body.artists.items;
					var artist_arr = [];
					var imageSrc;
					var id;
					if (Object.keys(body).length > 0) {
						for (var i = 0; i < Object.keys(body).length; i++) {
							id = body[i].id;
							name = body[i].name;
							imageSrc = body[i].images;
							if (imageSrc.length > 0) {
								imageSrc = body[i].images[0].url;
							} else {
								imageSrc = null;
							}
							artist_arr.push({ id: id, name: name, image: imageSrc });
						}
						this.setState({ searchedArtists: artist_arr, loading: false });
					} else {
						this.setState({ searchedArtists: [], loading: false });
					}
				});
		}
	}

	handleArtistSelect(event) {
		var id = event.target.id;
		var name = event.target.name;
		this.setState({
			artists: this.state.artists.concat({
				id: id,
				name: name
			})
		});
	}

	handleArtistDelete(event) {
		var id = event.target.attributes.value['value'];
		this.setState({ artists: this.state.artists.concat(input) });
	}

	handleFirstName(event) {
		var input = event.target.value.replace(stringWhiteSpaceTrim, '');
		input = input.charAt(0).toUpperCase() + input.slice(1);
		this.validateFirstName(input);
		this.setState({ firstName: input });
	}

	handleLastName(event) {
		var input = event.target.value.replace(stringWhiteSpaceTrim, '');
		input = input.charAt(0).toUpperCase() + input.slice(1);
		this.validateLastName(input);
		this.setState({ lastName: input });
	}

	handleEmail(event) {
		var input = event.target.value;
		input = input.toLowerCase();
		this.setState({ email: input });
	}

	handleAge(event) {
		var input = event.target.value;
		if (input.length < 3 && input.match(onlyIntegers)) {
			this.setState({ age: event.target.value });
		}
	}

	handleZipcode(event) {
		var input = event.target.value;
		if (input.length < 6 && input.match(onlyIntegers)) {
			this.setState({ zipcode: event.target.value });
		}
	}

	handleSubscriberType(event) {
		var input = event.target.value;
		this.validateSubscriberType(input);
		this.setState({ subscriberType: input });
	}

	handleArtists(event) {
		this.setState({ lastKeyPressedTime: Date.now() });
		var input = event.target.value.replace(stringWhiteSpaceTrim, '');
		if (input != '') {
			setTimeout(() => this.searchArtistsByName(input), 200);
		} else {
			this.setState({ loading: false, searchedArtists: [] });
		}
	}

	handleGenres(event) {
		var input = event.target.value;
		this.validateGenres(input);
		this.setState({ genres: input });
	}

	validateFirstName(firstName) {
		if (firstName === '') {
			let newError = { firstName: null };
			this.setState({ errors: Object.assign(this.state.errors, newError) });
			return false;
		} else {
			let errorState = this.state.errors;
			delete errorState.firstName;
			this.setState({ errors: errorState });
			return true;
		}
	}

	validateLastName(lastName) {
		if (lastName === '') {
			let newError = { lastName: null };
			this.setState({ errors: Object.assign(this.state.errors, newError) });
			return false;
		} else {
			let errorState = this.state.errors;
			delete errorState.lastName;
			this.setState({ errors: errorState });
			return true;
		}
	}

	validateEmail(email) {
		if (email === '') {
			let newError = { email: null };
			this.setState({ errors: Object.assign(this.state.errors, newError) });
			return false;
		} else if (!email.match(emailRegexp)) {
			let newError = { email: 'Email must be valid' };
			this.setState({ errors: Object.assign(this.state.errors, newError) });
			return false;
		} else {
			let errorState = this.state.errors;
			delete errorState.email;
			this.setState({ errors: errorState });
			return true;
		}
	}

	validateAge(age) {
		if (age[0] === '0') {
			age = age.slice(1, age.length);
		}
		if (age === '') {
			let newError = { age: null };
			this.setState({ errors: Object.assign(this.state.errors, newError) });
			return false;
		} else {
			let errorState = this.state.errors;
			delete errorState.age;
			this.setState({ errors: errorState });
			return true;
		}
	}

	validateZipcode(zipcode) {
		if (zipcode === '') {
			let newError = { zipcode: null };
			this.setState({ errors: Object.assign(this.state.errors, newError) });
			return false;
		} else if (!zipcode.match(zipcodeRegexp)) {
			let newError = { zipcode: 'Zipcode field may be valid' };
			this.setState({ errors: Object.assign(this.state.errors, newError) });
			return false;
		} else {
			let errorState = this.state.errors;
			delete errorState.zipcode;
			this.setState({ errors: errorState });
			return true;
		}
	}

	validateSubscriberType(subscriberType) {
		if (subscriberType === '') {
			let newError = {
				subscriberType: null
			};
			this.setState({ errors: Object.assign(this.state.errors, newError) });
			return false;
		} else {
			let errorState = this.state.errors;
			delete errorState.subscriberType;
			this.setState({ errors: errorState });
			return true;
		}
	}

	validateArtists(artists) {
		if (artists === '') {
			let newError = {
				artists: null
			};
			this.setState({ errors: Object.assign(this.state.errors, newError) });
			return false;
		} else {
			let errorState = this.state.errors;
			delete errorState.artists;
			this.setState({ errors: errorState });
			this.searchArtistsByName(artists);
			return true;
		}
	}

	validateGenres(genres) {
		if (genres === '') {
			let newError = {
				genres: null
			};
			this.setState({ errors: Object.assign(this.state.errors, newError) });
			return false;
		} else {
			let errorState = this.state.errors;
			delete errorState.genres;
			this.setState({ errors: errorState });
			return true;
		}
	}

	handleClearForm(event) {
		event.preventDefault();
		this.setState({
			errors: {},
			firstName: '',
			lastName: '',
			email: '',
			zipcode: '',
			age: '',
			subscriberType: '',
			artists: '',
			genres: ''
		});
	}

	render() {
		let artistIcons = [];
		let artistList = [];
		let errorDiv;
		let errorItems;
		if (Object.keys(this.state.errors).length > 0) {
			var errorArray = Object.values(this.state.errors).filter(error => {
				return error != null;
			});
			if (errorArray.length != 0) {
				errorItems = errorArray.map(error => {
					return <div key={error}>{error}</div>;
				});
				errorDiv = <div className="landing-page-form-errors">{errorItems}</div>;
			}
		}
		if (this.state.searchedArtists.length > 0) {
			artistIcons = (
				<ArtistIcons
					searchedArtists={this.state.searchedArtists}
					handleArtistSelect={this.handleArtistSelect}
				/>
			);
		}
		if (this.state.artists.length > 0) {
			artistList = (
				<ArtistList
					savedArtists={this.state.artists}
					handleArtistDelete={this.handleArtistDelete}
				/>
			);
		}

		return (
			<form className="sign-up">
				{errorDiv}
				<TextInput
					error={Object.keys(this.state.errors).includes('firstName')}
					placeholder="first name"
					name="firstName"
					value={this.state.firstName}
					handlerFunction={this.handleFirstName}
				/>
				<TextInput
					error={Object.keys(this.state.errors).includes('lastName')}
					placeholder="last name"
					name="lastName"
					value={this.state.lastName}
					handlerFunction={this.handleLastName}
				/>
				<TextInput
					error={Object.keys(this.state.errors).includes('email')}
					placeholder="email"
					name="email"
					value={this.state.email}
					handlerFunction={this.handleEmail}
				/>
				<TextInput
					error={Object.keys(this.state.errors).includes('age')}
					placeholder="age"
					name="age"
					inputType="number"
					maxLength="2"
					value={this.state.age}
					handlerFunction={this.handleAge}
				/>
				<TextInput
					error={Object.keys(this.state.errors).includes('zipcode')}
					placeholder="zip"
					name="zipcode"
					maxLength="5"
					value={this.state.zipcode}
					handlerFunction={this.handleZipcode}
				/>
				<Select
					error={Object.keys(this.state.errors).includes('subscriberType')}
					handlerFunction={this.handleSubscriberType}
					name="subscriberType"
					placeholder="what kind of listener are you?"
					options={this.state.subscriberTypes}
					selectedOption={this.state.subscriberType}
				/>
				<TextInput
					error={Object.keys(this.state.errors).includes('artists')}
					name="artists"
					placeholder="who are your favorite artists?"
					handlerFunction={this.handleArtists}
				/>
				{artistList}
				{this.state.loading ? (
					<Pulse id="spinner" size={50} color="#2A486A" />
				) : null}
				{artistIcons}
				<div className="button-group">
					{/* <button onClick={this.props.goBack} className="form-button">
						Go Back
					</button> */}
					<button className="form-button" onClick={this.handleFormSubmit}>
						Submit
					</button>
				</div>
			</form>
		);
	}
}

export default RegisterForm;
