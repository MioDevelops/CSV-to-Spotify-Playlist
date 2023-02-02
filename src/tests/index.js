const AXIOS = require("axios");
const { application } = require("express");
const CONFIG = require("../config.json");

class Tests {
    constructor(OAuth) {
        this.axios = AXIOS.default;
        this.auth = OAuth;
        this.header = {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "Authorization": `Bearer ${this.auth}`
        }
    }
    
    //  Eventually we will add constraints such as duration limit, explicit content, etc. \\ 
    async get_track(track_id, market_type) {
        this.axios.get(`https://api.spotify.com/v1/tracks/${track_id}?market=${market_type}`, {
            headers: this.header
        }).then((response) => console.log(response.data)).catch((err) => console.error("Failed to get track with an error code of", err.response.status))
    };

    async add_tracks(playlist_id, track_list) {
        this.axios.post(`https://api.spotify.com/v1/playlists/${playlist_id}/tracks?uris=${track_list.join("%2C")}`, {}, {
            headers: this.header
        }).then(() => console.log("Successfully added songs to desired playlist!")).catch((err) => console.error("Failed to add tracks with an error code of", err.response.status))
    };

    async get_track_by_name(track_name, track_artist) {
        this.axios.get(`https://api.spotify.com/v1/search?q=track:${track_name.split(" ").join("%20")}%20artist:${track_artist.split(" ").join("%20")}&type=track`, {
            headers: this.header
        }).then((response) => console.log(response.data)).catch((err) => console.error("Failed to get track by name with an error code of", err.response.status))
    }
}

module.exports = Tests;