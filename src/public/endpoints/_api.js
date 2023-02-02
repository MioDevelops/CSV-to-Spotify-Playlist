class API {
    constructor() {
        this.method = "GET";
        this.path = "/api";
        this.name = "api";
    }

    async request(req, res) {
        res.send("Hello world!");
    }

    deploy(app) {
        app[this.method.toLowerCase()](this.path + `/${this.name}`, this.request.bind(this));
    }
}

module.exports = API;