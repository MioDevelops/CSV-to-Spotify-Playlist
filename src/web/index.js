const CONFIG = require("../config.json");

class Web {
    constructor() {
        this.express = require("express");
        this.app = this.express();
    }

    deploy() {
        this.app.use(this.express.json());

        this.app.use(this.express.static("public/web"));

        this.app.listen(CONFIG.web.port, () => {
            console.log(`Web server listening on port ${CONFIG.web.port}`);
        });
    }
}

module.exports = Web;