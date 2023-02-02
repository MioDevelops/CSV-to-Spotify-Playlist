const API = require("./_api");

class UploadCSV extends API {
    constructor() {
        super();

        this.name = "csv";
        this.method = "POST";
    }

    async request(req, res) {
        let file;

        if (!req.files || Object.keys(req.files).length === 0) {
            return res.status(400).send("No files were uploaded.");
        }

        file = req.files.file;

        // Validate file type
        if (file.mimetype !== "text/csv") {
            return res.status(400).send("Invalid file type.");
        }

        // Validate file size
        if (file.size > 1000000) {
            return res.status(400).send("File too large.");
        }

        // Create random file name
        await file.mv(`../src/public/csv/${file.md5}.csv`);

        return res.send("File uploaded.");
    }
}

module.exports = UploadCSV;