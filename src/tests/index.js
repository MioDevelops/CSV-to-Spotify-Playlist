const AXIOS = require("axios");
const { application, response } = require("express");
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

    async check_oauth() {
        let res = this.axios.get(`https://accounts.spotify.com/api/token`, {
            headers: this.header
        }).catch((err) => {
            console.log("Failed to get token status")
        })

        console.log(res);
    }
    
    //  Eventually we will add constraints such as duration limit, explicit content, etc. \\
    async add_track_to_playlist(playlist_id, track_uris) {
		let timeout = 0;
		
		if(track_uris.length > 30) {
			console.log("creating timeout..")
			timeout = 500;
		}
	}

    async get_track_by_name(track_name, track_artist) {
        let res = this.axios.get(`https://api.spotify.com/v1/search?q=track:${track_name.split(" ").join("%20")}%20artist:${track_artist.split(" ").join("%20")}&type=track`, {
            headers: this.header
        }).then((response) => {
			let song_info = response.data.tracks.items[0]
			var data = {
				name: song_info.name,
				artist: song_info.artists[0].name,
				duration: song_info.duration_ms,
				explicit: song_info.explicit,
				uri: song_info.uri
			}
			
			return data;
		}).catch((error) => {
			return { response: { status: error.response.status, data: null }}
		})
    
		return res;
	}

	async get_user_info() {
		let res = await this.axios.get("https://api.spotify.com/v1/me", {
			headers: this.header
		}).then((response) => {
			return { response: { status: response.status, data: response.data }}
		}).catch((error) => {
			return { response: { status: error.response.status, data: null }}
		})

		return res;
	}

    async create_playlist(current_user_id, name, public_playlist, desc) {
		 let res = await this.axios.post(`https://api.spotify.com/v1/users/${current_user_id}/playlists`, {}, {
            headers: this.header,
			data: {
				"name": name,
				"description": desc,
				"public": public_playlist
			}
        }).then((response) => {
			return { response: { status: response.status, data: response.data }}
		}).catch((error) => {
			return { response: { status: error.response.status, data: null }}
		})

		return res;
    }
}

module.exports = Tests;