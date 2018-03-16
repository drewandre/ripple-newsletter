import React, { Component } from 'react';
import TextInput from '../components/TextInput';
import Select from '../components/Select';
import ArtistIcons from '../components/ArtistIcons';
import ArtistList from '../components/ArtistList';

// import MailchimpSubscribe from 'react-mailchimp-subscribe';

const url = 'https://us17.api.mailchimp.com/3.0/lists/a1739a408d/members';

var stringWhiteSpaceTrim = /^\s+|\s+$/g;
var zipcodeRegexp = /^\d{5}$|^\d{5}-\d{4}$/;
var onlyIntegers = /^[0-9]*$/;
var emailRegexp = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

class RegisterForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
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
				'passive listener',
				'active listener',
				'musician',
				'verified artist',
				'fan'
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
		// if (
		// 	this.validateFirstName(this.state.firstName) &&
		// 	this.validateLastName(this.state.lastName) &&
		// 	this.validateEmail(this.state.email) &&
		// 	this.validateAge(this.state.age) &&
		// 	this.validateZipcode(this.state.zipcode) &&
		// 	this.validateSubscriberType(this.state.sucscriberType) &&
		// 	this.validateArtists(this.state.artists) &&
		// 	this.validateGenres(this.state.genres)
		// ) {
		// 	let formPayLoad = {
		// 		firstName: this.state.firstName,
		// 		lastName: this.state.lastName,
		// 		email: this.state.email,
		// 		age: this.state.age,
		// 		zipcode: this.state.zipcode,
		// 		subscriberType: this.state.subscriberType,
		// 		artists: this.state.artists,
		// 		genres: this.state.genres
		// 	};
		// 	// fetch(`/register`, {
		// 	// 	method: 'POST',
		// 	// 	body: JSON.stringify(formPayload)
		// 	// });
		// 	this.handleClearForm(event);
		// }

		debugger;

		// response = RestClient::Request.execute(
		// 	method: :post,
		// 	user: 'anything',
		// 	password: '526e48d4d5e6341fa9e2f6f174149243',
		// 	url: "https://us17.api.mailchimp.com/3.0/lists/a1739a408d/members",
		// 	payload: { 'email_address':email, "status":"subscribed", merge_fields:{"NAME":name, "ZIPCODE":zipcode, "CATEGORY":category, "COMMENT":comment, "AGE":age} }.to_json,
		// 	headers: { :accept => :json, content_type: :json }
		// )
	}

	searchArtistsByName(artist_name) {
		if (Date.now() - this.state.lastKeyPressedTime > 200) {
			fetch(`/spotify/artists/${artist_name}`)
				.then(response => {
					if (response.ok) {
						return response;
					}
				})
				.then(response => response.json())
				.then(body => {
					var artist_arr = [];
					var imageSrc;
					var id;
					if (Object.keys(body).length > 0) {
						for (var i = 0; i < body.length; i++) {
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
					}
					this.setState({ searchedArtists: artist_arr });
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
		if ((age[0] = '0')) {
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

	componentDidMount() {
		// fetch(`/user`)
		// 	.then(response => {
		// 		if (response.ok) {
		// 			return response;
		// 		} else {
		// 			return null;
		// 		}
		// 	})
		// 	.then(response => response.json())
		// 	.then(user => {
		// 		var userPayload = [];
		// 		var artistPayload = [];
		// 		for (var i = 0; i < user.top_artist_ids.length; i++) {
		// 			artistPayload.push({
		// 				id: user.top_artist_ids[i],
		// 				name: user.top_artist_names[i],
		// 				images: user.top_artist_images[i]
		// 			});
		// 		}
		// 		userPayload.push(user, artistPayload);
		// 		return userPayload;
		// 	})
		// 	.then(userPayload => {
		// 		this.setState({
		// 			firstName: userPayload[0].name,
		// 			email: userPayload[0].email,
		// 			age: userPayload[0].age,
		// 			artists: userPayload[1],
		// 			genres: userPayload[0].top_genres
		// 		});
		// 		return userPayload;
		// 	})
		// 	.then(userPayload => {
		// 		this.handleFormSubmit(false);
		// 	})
		// 	.catch(function(error) {
		// 		console.log('no user found');
		// 	});
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
			<form className="sign-up" onSubmit={this.handleFormSubmit}>
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
				{artistIcons}
				<div className="button-group">
					<button onClick={this.props.goBack} id="form-disable">
						Go Back
					</button>
					{/* <button className="form-submit-button" type="submit" /> */}
				</div>
			</form>
		);
	}

	// render() {
	// 	return (
	// 		<form action={url} method="POST" noValidate>
	// 			<input type="hidden" name="u" value="eb05e4f830c2a04be30171b01" />
	// 			<input type="hidden" name="id" value="8281a64779" />
	// 			<label htmlFor="MERGE0">
	// 				Email
	// 				<input
	// 					type="email"
	// 					name="EMAIL"
	// 					id="MERGE0"
	// 					value={this.state.emailValue}
	// 					onChange={e => {
	// 						this.setState({ emailValue: e.target.value });
	// 					}}
	// 					autoCapitalize="off"
	// 					autoCorrect="off"
	// 				/>
	// 			</label>
	// 			<label htmlFor="MERGE1">
	// 				First name
	// 				<input
	// 					type="text"
	// 					name="FNAME"
	// 					id="MERGE1"
	// 					value={this.state.fNameValue}
	// 					onChange={e => {
	// 						this.setState({ fNameValue: e.target.value });
	// 					}}
	// 				/>
	// 			</label>
	// 			<label htmlFor="MERGE2">
	// 				Last name
	// 				<input
	// 					type="text"
	// 					name="LNAME"
	// 					id="MERGE2"
	// 					value={this.state.lNameValue}
	// 					onChange={e => {
	// 						this.setState({ lNameValue: e.target.value });
	// 					}}
	// 				/>
	// 			</label>
	// 			<input
	// 				type="submit"
	// 				value="Subscribe"
	// 				name="subscribe"
	// 				id="mc-embedded-subscribe"
	// 				className="button"
	// 			/>
	//
	// 			<div
	// 				style={{ position: 'absolute', left: '-5000px' }}
	// 				aria-hidden="true"
	// 				aria-label="Please leave the following three fields empty"
	// 			>
	// 				<label htmlFor="b_name">Name: </label>
	// 				<input
	// 					type="text"
	// 					name="b_name"
	// 					tabIndex="-1"
	// 					value=""
	// 					placeholder="Freddie"
	// 					id="b_name"
	// 				/>
	//
	// 				<label htmlFor="b_email">Email: </label>
	// 				<input
	// 					type="email"
	// 					name="b_email"
	// 					tabIndex="-1"
	// 					value=""
	// 					placeholder="youremail@gmail.com"
	// 					id="b_email"
	// 				/>
	//
	// 				<label htmlFor="b_comment">Comment: </label>
	// 				<textarea
	// 					name="b_comment"
	// 					tabIndex="-1"
	// 					placeholder="Please comment"
	// 					id="b_comment"
	// 				/>
	// 			</div>
	// 		</form>
	// 	);
	// }
}

export default RegisterForm;
