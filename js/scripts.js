$(document).ready(function () {

	// Execute background change on header/hero banner every 5 seconds
	changeBG();
	setInterval(changeBG, 5000);

	// Add validation to form on "contact" page
	validateForm();

	APPController.init();
});



// Settings for Slick carousel
const singleCarousel = {
	autoplay: true,
	infinite: true,
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
			phone: 'Please enter a valid phone number',
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

	const clientId = '5010e2be878d4c8cb3c766e8e367431b';
	const clientSecret = 'dc1997ba8b8042438914d7e8c2e662d9';
	const playlistID = '6MfkoiUr4P9iDLN5VZSvQN';

	// private methods
	const _getToken = async () => {
		const result = await fetch('https://accounts.spotify.com/api/token', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
				'Authorization': 'Basic ' + btoa(clientId + ':' + clientSecret)
			},
			body: 'grant_type=client_credentials'
		});

		const data = await result.json();
		return data.access_token;
	}

	const _getPlaylist = async (token) => {
		const result = await fetch(`https://api.spotify.com/v1/playlists/${playlistID}`, {
			method: 'GET',
			headers: { 'Authorization': 'Bearer ' + token }
		});

		const data = await result.json();
		return data;
	}

	const _getArtists = async (token, artistsIDs) => {
		const result = await fetch(`https://api.spotify.com/v1/artists?ids=${artistsIDs}`, {
			method: 'GET',
			headers: { 'Authorization': 'Bearer ' + token }
		});

		const data = await result.json();
		return data;
	}

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
})();


// UI Module
const UIController = (function () {

	const Token = '#hidden_token';

	//public methods
	return {
		storeToken(token) {
			document.querySelector(Token).value = token;
		},
		getStoredToken() {
			return {
				token: document.querySelector(Token).value
			}
		}
	}

})();

const APPController = (function (UICtrl, APICtrl) {

	const loadPlaylist = async () => {
		//get the token
		const token = await APICtrl.getToken();
		//store the token onto the page
		UICtrl.storeToken(token);
		const playlist = await APICtrl.getPlaylist(token);
		let artists = '';
		for (let track of playlist.tracks.items) {
			artists += `${track.track.artists[0].id},`;
			addEmbed(track.track.id)
		}

		artists = artists.slice(0, -1);
		loadArtists(artists);
	}

	function addEmbed(trackID) {
		$('#tracks').prepend(`<iframe src="https://open.spotify.com/embed/track/${trackID}"
			width="300" height="380" frameborder="0"
			allowtransparency="true" allow="encrypted-media">
		</iframe>`)
	}

	function addAlbumData(data) {
		console.log(data)
		$('#tracks').prepend(`<div class="dark-bg col bord">
			<img class="square card-img-top img-fluid pt-5" src="${data.album.images[0].url}" alt="">
			<div class="card-body">
				<h1 class="card-title lead font-weight-bold">${data.name}</h1>
				<img class="rounded-circle" src="images/dark_wave.jpg" height="100rem" width="100rem"
					alt="">
				<h2 class="pt-2 mb-1 lead">${data.artists[0].name}</h2>
				<p class="pt-2 mb-1">${data.album.name}</p>
			</div>
		</div>`)
	}

	function addArtistData(data) {
		$('#album').prepend(`<div class="flex-column">
            <img class="square mx-auto" src="${data.images[0].url}" alt="album cover">
            <h3 class="py-4">${data.name}</h3>
        </div>`);
	}

	const loadArtists = async (artistsIDs) => {
		//get the token
		const token = await APICtrl.getToken();
		//store the token onto the page
		UICtrl.storeToken(token);
		const artists = await APICtrl.getArtists(token, artistsIDs);
		for (let artist of artists.artists) {
			addArtistData(artist);
		}
		$('#album').slick(singleCarousel);
	}

	return {
		init() {
			console.log('App is starting');
			loadPlaylist();
		}
	}

})(UIController, APIController);
