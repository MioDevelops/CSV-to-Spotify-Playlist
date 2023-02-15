const API = require("./_api");
const spotify_api = require("../../tests");

class CreatePlaylist extends API {
    constructor() {
        super();

        this.name = "playlist";
    }

    async request(req, res) {
        if (req.query.auth === null) {
			return res.status(400).send("Auth is required");
		}

        if(req.query.song_uris === null) {
			return res.status(400).send("No song uris provided");	
		}

        const spotify = new spotify_api(req.query.auth);

        let user = await spotify.get_user_info();
        
        if(!(user.response.status === 200))
            return res.status(400).send("Failed to get user information");
        
        let playlist = await spotify.create_playlist(user.response.data.id, "CSVPlaylist", true, true, "Created with CSV to Playlist");

        if(!(playlist.response.status === 200))
            return res.status(400).send("Failed to create playlist");

        spotify.add_track_to_playlist(playlist.response.data.id, req.query.song_uris);
    }
}

module.exports = CreatePlaylist;