const AXIOS = require("axios");
const CONFIG = require("../config.json");

class Tests {
    constructor() {
        this.axios = AXIOS.default;
    }
    
    async get() {
    
    }
}

module.exports = Tests;