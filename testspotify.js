const APIController = (function () {

    const clientId = '5010e2be878d4c8cb3c766e8e367431b';
    const clientSecret = 'dc1997ba8b8042438914d7e8c2e662d9';
    const playlistID = '6u3lNpboYHGfw1z2ZR0tix?si=f3a5660897fa4bff';

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

    const _getTrack = async (token, trackID) => {

        const result = await fetch(`https://api.spotify.com/v1/tracks/${trackID}`, {
            method: 'GET',
            headers: { 'Authorization': 'Bearer ' + token }
        });

        const data = await result.json();
        return data.name;
    }

    const _getArtist = async (token, artistID) => {
        const result = await fetch(`https://api.spotify.com/v1/artists/${artistID}`, {
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
        getTrack(token, playlistId) {
            return _getTrack(token, playlistId);
        },
        getArtist(token, artistId) {
            return _getArtist(token, artistId);
        }
    }
})();


// UI Module
const UIController = (function () {

    const Token = '#hidden_token';

    //public methods
    return {
        storeToken(token) {
            // document.querySelector(DOMElements.hfToken).value = token;
            document.querySelector(Token).value = token;
        },
        getStoredToken() {
            return {
                // token: document.querySelector(DOMElements.hfToken).value
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
        for (let track of playlist.tracks.items) {
            loadTrack(track.track.id);
            loadArtist(track.track.artists[0].id);
        }
    }

    const loadTrack = async (trackID) => {
        //get the token
        const token = await APICtrl.getToken();
        //store the token onto the page
        UICtrl.storeToken(token);
        const track = await APICtrl.getTrack(token, trackID);
        // console.log(track);
        // }
    }

    const loadArtist = async (artistID) => {
        //get the token
        const token = await APICtrl.getToken();
        //store the token onto the page
        UICtrl.storeToken(token);
        const artist = await APICtrl.getArtist(token, artistID);
        // console.log(artist.images[0].url);
        // console.log(artist.name);
    }

    return {
        init() {
            console.log('App is starting');
            loadPlaylist();
        }
    }

})(UIController, APIController);

// will need to call a method to load the genres on page load
APPController.init();