const AXIOS = require("axios");
const API = require("./_api");

class Status extends API {
    constructor() {
        super();

        this.name = "oauth";
    }

    async request(req, res) {
		if(req.query.auth !== "null");
        
        let api = await AXIOS.default.get(`https://api.spotify.com/v1/api/token`, {
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": `Bearer ${req.query.auth}`
            }
        }).catch(async (err) => {
            if (err.response.data.error.status == 401) {
                res.send("BAD");
            } else {
                res.send("OK");
            }
        })
    }
}

module.exports = Status;