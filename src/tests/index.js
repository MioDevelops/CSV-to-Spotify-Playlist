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
		function delay(i) {
			return new Promise((resolve) => {
				setTimeout(() => {
					resolve(i);
				}, i);
			});
		}

		for(var x = 0; x < track_uris.length;  x++) {
			if((x % 1) == 0) {
				await delay(3000);
			}

			let res = await this.axios.post(`https://api.spotify.com/v1/playlists/${playlist_id}/tracks?uris=${track_uris[x]}`, {}, {
				headers: this.header
			}).then((response) => {
				console.log(response.status)
				return true;
			}).catch((err) => {
				return false;
			})

			if(!res)
				break;
		}
	}

    async get_track_by_name(track_name, track_artist) {
        let response = this.axios.get(`https://api.spotify.com/v1/search?q=track:${track_name.split(" ").join("%20")}%20artist:${track_artist.split(" ").join("%20")}&type=track`, {
            headers: this.header
        }).catch((error) => {
			return { response: { status: error.response.status, data: null }}
		})

		let song_info = response.data.tracks.items[0]
		var data = {
			name: song_info.name,
			artist: song_info.artists[0].name,
			duration: song_info.duration_ms,
			explicit: song_info.explicit,
			uri: song_info.uri
		}
		
		return data;
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