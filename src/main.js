const CONFIG = require("./config.json");

const WEB = require("./web");
const WEB_INSTANCE = new WEB();

WEB_INSTANCE.deploy();

const TESTS = require("./tests");
const spotify = new TESTS(CONFIG.test.auth);

async function test() {
	let user = await spotify.get_user_info();
	
	if(!(user.response.status === 200))
		return console.log("Failed to get user information")

	let playlist = await spotify.create_playlist(user.response.data.id, "dev test", true, true, "testing");
	console.log(playlist)

	let songs = ["spotify:track:2PWTZV5znjLtZC5T1EVJvL", "spotify:track:6EgwlXnFrfkFqOKqY3dqki"]
	spotify.add_track_to_playlist(playlist.response.data.id, songs)
}

test()

// Prevent the process from closing by using an emitter
const EVENTS = require("events");
const EVENT_EMITTER = new EVENTS.EventEmitter();

EVENT_EMITTER.on("end", () => { });