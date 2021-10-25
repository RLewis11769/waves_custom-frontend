$(document).ready(function () {

	// Execute background change on header/hero banner every 5 seconds
	changeBG();
	setInterval(changeBG, 5000);

	// Add validation to form on "contact" page
	validateForm();

	// Initialize methods for interacting with API
	APPController.init();
});



// Settings for Slick carousel
const singleCarousel = {
	autoplay: true,
	infinite: true,
	autoplaySpeed: 2000,
	arrows: false,
	dots: true
}


// Global variables for changeBG function
const images = ['hero1', 'hero2', 'hero3'];
let classIndex = -1;

function changeBG() {
	// Change background image in hero section
	let hero = $('#hero');

	// If not first time in function, take off existing class
	if (classIndex >= 0) {
		hero.removeClass(images[classIndex]);
	}

	// Add next class from 0-2 based on existing class
	classIndex = (classIndex + 1) % images.length;
	hero.addClass(images[classIndex]);
}


function validateForm() {
	// Add validation via jQuery Validate
	$('form').validate({
		rules: {
			// Define rules to be validated for each "name" in form
			first: 'required',
			last: 'required',
			phone: {
				required: true,
				tel: true
			},
			email: {
				required: true,
				email: true
			},
		},
		// Specify validation error messages
		messages: {
			first: 'Please enter a valid name',
			last: 'Please enter a valid name',
			phone: {
				required: 'Please enter a phone number',
				tel: 'Please enter a valid phone number'
			},
			email: {
				required: 'Please enter an email',
				email: 'Please enter a valid email'
			}
		},
		// Make sure the data in the form is submitted
		submitHandler: (form) => (form.submit())
	});
}


const APIController = (function () {
	// Client ID and secret ID assigned by Spotify to this app (these should be hidden...)
	const clientId = '5010e2be878d4c8cb3c766e8e367431b';
	const clientSecret = 'dc1997ba8b8042438914d7e8c2e662d9';
	// Hardcoded ID for "Waves" playlist of 12 songs
	const playlistID = '6MfkoiUr4P9iDLN5VZSvQN';

	// Private methods
	const _getToken = async () => {
		// Async method to pass client ID and secret to Spotify in return for token
		// Specifically for using Client Credentials OAuth2 - only includes endpoints
		const result = await fetch('https://accounts.spotify.com/api/token', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
				'Authorization': 'Basic ' + btoa(clientId + ':' + clientSecret)
			},
			body: 'grant_type=client_credentials'
		});
		// Token is returned as object so need to jsonify and pull out token itself
		const data = await result.json();
		return (data.access_token);
	}

	const _getPlaylist = async (token) => {
		// Async method to return data in playlist
		// Pass token and will access object at this URL
		const result = await fetch(`https://api.spotify.com/v1/playlists/${playlistID}`, {
			method: 'GET',
			headers: { 'Authorization': 'Bearer ' + token }
		});

		const data = await result.json();
		return (data);
	}

	const _getArtists = async (token, artistsIDs) => {
		// Async method to return data in playlist
		// Pass token and comma-separated list of artist IDs and will access object at this URL
		// Note: Could also access artists/${ID} several times but responsible to call several at once
		const result = await fetch(`https://api.spotify.com/v1/artists?ids=${artistsIDs}`, {
			method: 'GET',
			headers: { 'Authorization': 'Bearer ' + token }
		});

		const data = await result.json();
		return (data);
	}

	// External interface to make private methods available outside of function
	return {
		getToken() {
			return _getToken();
		},
		getPlaylist(token) {
			return _getPlaylist(token);
		},
		getArtists(token, artists_ids) {
			return _getArtists(token, artists_ids);
		}
	}
	// IIFE - immediately-invoked function expression
})();


// UI Module
const UIController = (function () {
	// Client-side storage of token in HTML
	// Note: Not at all connected to APICtrl()

	// Public methods
	return {
		storeToken(token) {
			document.querySelector('#hidden_token').value = token;
		},
		getStoredToken() {
			return {
				token: document.querySelector('#hidden_token').value
			}
		}
	}

})();

const APPController = (function (UICtrl, APICtrl) {
	// Controller function that has access to methods in functions passed in

	const loadPlaylist = async () => {
		// Get the token by accessing public method
		const token = await APICtrl.getToken();
		// Store token on the page
		UICtrl.storeToken(token);

		// Get playlist
		const playlist = await APICtrl.getPlaylist(token);
		// Artists must be passed in as comma-separated string
		let artists = '';
		// Do two things for each track in playlist:
		// 1. Add artist to artists string for slideshow on homepage
		// 2. Add embedded track on gallery page
		for (let track of playlist.tracks.items) {
			artists += `${track.track.artists[0].id},`;
			addEmbed(track.track)
		}

		// Slice off final comma and send entire string to function
		loadArtists(artists.slice(0, -1));
	}

	const loadArtists = async (artistsIDs) => {
		// Get the token by accessing public method
		const token = await APICtrl.getToken();
		// Store token on the page
		UICtrl.storeToken(token);

		// Get array of artist objects
		const artists = await APICtrl.getArtists(token, artistsIDs);
		// Add data to page in loop
		for (let artist of artists.artists) {
			addArtistData(artist);
		}
		// Now that data is populated, slick carousel on homepage
		$('#album').slick(singleCarousel);
	}

	function addEmbed(track) {
		// Add iframe/30-sec embedded track for each track in playlist
		$('#tracks').prepend(`<iframe src="https://open.spotify.com/embed/track/${track.id}"
			width="300" height="380" frameborder="0"
			allowtransparency="true" allow="encrypted-media"
			title="Embedded song ${track.name} by ${track.artists[0].name}">
		</iframe>`)
	}

	function addArtistData(data) {
		// Add data for each slide in slideshow
		$('#album').prepend(`<div class="flex-column">
			<img class="square mx-auto" src="${data.images[0].url}" alt="album cover">
			<h3 class="py-4">${data.name}</h3>
		</div>`);
	}

	return {
		// Public method driver program that can be accessed externally
		init() {
			// Enter loadPlaylist on initialization
			loadPlaylist();
		}
	}
	// UIController, APIController, and this APPController are all already called on initialization
})(UIController, APIController);
