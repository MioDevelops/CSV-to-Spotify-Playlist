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

        if(req.query.parsed_data === null) {
			return res.status(400).send("No parsed data provided");	
		}

        const spotify = new spotify_api(req.query.auth);

        
    }
}

module.exports = CreatePlaylist;