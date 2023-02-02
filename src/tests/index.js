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
        }).then((response) => console.log(response.data))
    }

    async add_tracks(playlist_id, track_list) {
        this.axios.post(`https://api.spotify.com/v1/playlists/${playlist_id}/tracks?uris=${track_list.join("%2C")}`, {}, {
            headers: this.header
        }).then((response) => console.log("Songs: ", response.statusText))
    }
}

module.exports = Tests;