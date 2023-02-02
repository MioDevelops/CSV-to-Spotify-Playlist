const WEB = require("./web");
const WEB_INSTANCE = new WEB();

WEB_INSTANCE.deploy();

const TESTS = require("./tests");
const TESTS_INSTANCE = new TESTS();

TESTS_INSTANCE.get();

// Prevent the process from closing by using an emitter
const EVENTS = require("events");
const EVENT_EMITTER = new EVENTS.EventEmitter();

EVENT_EMITTER.on("end", () => { });