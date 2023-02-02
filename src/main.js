const CONFIG = require("./config.json");

const WEB = require("./web");
const WEB_INSTANCE = new WEB();

WEB_INSTANCE.deploy();

const TESTS = require("./tests");
const TESTS_INSTANCE = new TESTS(CONFIG.test.auth);

TESTS_INSTANCE.get_track("0eGsygTp906u18L0Oimnem");
TESTS_INSTANCE.add_tracks("0F4OFi7fSAngLsa1Nnl5wB", ["spotify:track:0eGsygTp906u18L0Oimnem", "spotify:track:2Cqr74oA90iffydKmgjwhp"])
TESTS_INSTANCE.get_track_by_name("Born Without a Heart", "Faouzia")
TESTS_INSTANCE.add_track_to_queue("spotify:track:0eGsygTp906u18L0Oimnem", "603b97a69282a424a7629370a3fea072023cda54")
TESTS_INSTANCE.get_available_devices()

// Prevent the process from closing by using an emitter
const EVENTS = require("events");
const EVENT_EMITTER = new EVENTS.EventEmitter();

EVENT_EMITTER.on("end", () => { });