const API = require("./_api");
const AXIOS = require("axios").default;
const fs = require("fs");
const spotify_api = require("../../tests");

class CSVParser extends API {
    constructor() {
        super();

        this.name = "parser";
    }

    async request(req, res) {
		var returnedArr = [];
		var songs = [];

		const spotify = new spotify_api(req.query.auth)
		
		if(req.query.fileName === null) {
			return res.status(400).send("File name is required");	
		}

		if(req.query.auth === null) {
			return res.status(400).send("Auth is required");
		}

		console.log(req.query.auth)

		fs.readFile("./public/csv/" + req.query.fileName + ".csv", async function(err, content) {
			if(err)
				return res.status(400).send("File does not exist");

			var csvArr = content.toString("utf8").split("\r\n").map(e => {
				return e.toLowerCase()
			})
			var headers = csvArr[0].split(",")
			
			if(headers.includes("song title") && headers.includes("song artist")) {
				var song_title = headers.indexOf("song title");
				var song_artist = headers.indexOf("song artist");

				for(var i = 1; i < csvArr.length; i++) {
					let tempArr = csvArr[i].split(",");
	
					if(typeof tempArr[song_title] === "undefined" || typeof tempArr[song_artist] === "undefined") {
						continue;
					} else {
						// add song details into arr and send it back \\
						songs.push([tempArr[song_title], tempArr[song_artist]]);
					}
				}

				// run songs through the spotify api \\
				for(var x = 0; x < songs.length; x++) {
					let track = await spotify.get_track_by_name(songs[x][0], songs[x][1]);

					returnedArr.push(track);
				}
				
				return res.status(200).send(returnedArr);
			}
			
			return res.status(400).send("The csv file needs to include a cell of 'song artist' and 'song title'.");
		})
	}
}

module.exports = CSVParser;