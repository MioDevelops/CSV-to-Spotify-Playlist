const AXIOS = require("axios");

class Tests {
    constructor() {
        this.axios = AXIOS.default;
    }
    
    async get() {
        const res = await this.axios.post("https://api.spotify.com/v1/playlists/7jgHxPffuBMeEZFtWwrJqb/tracks?uris=spotify:track:01WJWHv12F3nWeXGYsmOOs", {}, {
            headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            //"Authorization": "Bearer BQC-u5_o-lEk424-dO8KQxPvdEptxfW7tTGAajWmSnMOSI7JAfqEfzGkCHhwgEkvbtoO4zozXtAJM8zQZ4Unh1q2NL9RtuBknF7NljovBdZ9eUS_jJN4sKzPFaddGR658y0irj5uRnCVJcySVyCXANXawLMjDHraq6GxQCz5ftBS3UXlk9Rjby4Uk3Cfcf8U8WJdYNeCYcuknkHih5gypBfjrvEyf-7MQxQdmialzQKIe2dC9w-VvYeAXlXRjFZ9CA"
            }
        })

        console.log(res.body)
    }
}

module.exports = Tests;