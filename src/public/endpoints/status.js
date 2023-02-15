const API = require("./_api");

class Status extends API {
    constructor() {
        super();

        this.name = "status";
    }

    async request(req, res) {
        return res.send("OK");
    }
}

module.exports = Status;