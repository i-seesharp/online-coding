const path = require("path");
const express = require("express");
const router = express.Router();
const client = require("mongodb").MongoClient;
const rootDir = __dirname.split(path.sep).slice(0,__dirname.split(path.sep).length-1).join(path.sep);
const variables = require(path.join(rootDir, "variables.js"));
const database = variables.database;

router.get("/solved", (req, res) => {
    const username = req.session.username;
    if(!username) res.json({ msg : "failure" });
    client.connect(database, (err, db) => {
        if(err){
            db.close();
            return res.json({ msg : "failure" });
        }
        const dbo = db.db("online-coding");
        const collection = "statistics";
        let query = { username : username };
        dbo.collection(collection).findOne(query, (err, result) => {
            if(err || !result) {
                db.close();
                return res.json({ msg : "failure" });
            }
            const easy = parseInt(result["solved"]["easy"]);
            const medium = parseInt(result["solved"]["medium"]);
            const hard = parseInt(result["solved"]["hard"]);
            db.close();
            res.json({ msg : "success", easy : easy, medium : medium, hard : hard });
        });
    });
});

module.exports = router;
