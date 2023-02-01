const AXIOS = require("axios");

class Tests {
    constructor() {
        this.axios = AXIOS.default;
    }
    
    async get_track() {
        const res = await this.axios.post("https://api.spotify.com/v1/tracks/2YSCvCiVVfoWsZPevGKH2k?market=ES", {}, {
            headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "Authorization": "Bearer BQA9_utRslPGrXXZEVLdgot2VJX69PwRroj_JEk8vwFJZNmt5qZ7IpkRc1EZLq5RSQzi7T8d06xHb4uIwCg1mEklY4OOvZEQ3i0GzMzeTarJSg9WL2KZx0O0cIOR214AaqBkwS-9eJ58StsgMDQ5TRStsGnwUMVnEWUnWR-Vk6_EO0FoER3xrmiFv9NfK9KRpuQSoY_x9E5NhmbNWhU5AdiLslyj-DsoXFMDAkeEWNHpnxvNEFKyxQI7veBenrvXIQ"
            }
        })

        console.log(res.data);
    }
}

module.exports = Tests;