const FS = require("fs");
const FILEUPLOAD = require("express-fileupload");

const CONFIG = require("../config.json");

class Web {
    constructor() {
        this.express = require("express");
        this.app = this.express();

        this.loadedEndpoints = [];
    }

    deploy() {
        this.app.use(this.express.json());

        this.app.use(this.express.static("public/web/"));

        this.app.use(FILEUPLOAD());

        FS.readdirSync(__dirname + "/../public/endpoints/").forEach((file) => {
            if (file.startsWith("_")) return;
            
            const ENDPOINT = require(__dirname + `/../public/endpoints/${file}`);
            const ENDPOINT_INSTANCE = new ENDPOINT();

            this.loadedEndpoints.push(ENDPOINT_INSTANCE);

            ENDPOINT_INSTANCE.deploy(this.app);
        });

        this.app.listen(CONFIG.web.port, () => {
            console.log(`Web server listening on port ${CONFIG.web.port}`);
        });
    }
}

module.exports = Web;