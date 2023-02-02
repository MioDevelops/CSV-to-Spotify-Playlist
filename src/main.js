const WEB = require("./web");
const WEB_INSTANCE = new WEB();

WEB_INSTANCE.deploy();

const TESTS = require("./tests");
const TESTS_INSTANCE = new TESTS("BQCl6VLt1zGEfxwmP17XLJUVdTGyAJbDToxo6E2PoZWP7Gj31YhH9PDDoPdeuzoxynH4thmZWpBZd3Aisw4BKhYD010hJ-tJ9Lr03VjuENKVoH2pJRs4GVOC-6PIkv24HFMhZLFXS8iha38MSYwj4H0nXbYXCMu_ZYG0W-ZXpHj97Jl1YrBFd7bQoeuj_gizFviE-cft1swVWCfbkgGvNqrOFsh3eKsD5L96aW96lc3ki3WnR0dqySpDapAPeD6prw");

TESTS_INSTANCE.get_track("0eGsygTp906u18L0Oimnem", "ES");
TESTS_INSTANCE.add_tracks("0F4OFi7fSAngLsa1Nnl5wB", ["spotify:track:0eGsygTp906u18L0Oimnem", "spotify:track:2Cqr74oA90iffydKmgjwhp"])

// Prevent the process from closing by using an emitter
const EVENTS = require("events");
const EVENT_EMITTER = new EVENTS.EventEmitter();

EVENT_EMITTER.on("end", () => { });