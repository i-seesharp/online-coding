const path = require("path");
const express = require("express");
const router = express.Router();
const client = require("mongodb").MongoClient;
const rootDir = __dirname.split(path.sep).slice(0,__dirname.split(path.sep).length-1).join(path.sep);
const variables = require(path.join(rootDir, "variables.js"));
const database = variables.database;

router.get("/", (req, res) => {
    const question = req.query.question;
    client.connect(database, (err, db) => {
        if(err){
            db.close();
            return res.json({ msg : "failure "});
        }
        const dbo = db.db("online-coding");
        const collection = "problems";
        const query = { url : question };
        dbo.collection(collection).findOne(query, (err, result) => {
            if(err || !result) {
                db.close();
                return res.json({ msg : "failure" });
            }
            db.close();
            return res.json( { msg : "success", title : result.title, difficulty : result.difficulty,
                    acceptance : result.acceptance, templates : result.templates });
        });
    });
});

module.exports = router;