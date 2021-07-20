const path = require("path");
const express = require("express");
const router = express.Router();
const client = require("mongodb").MongoClient;
const rootDir = __dirname.split(path.sep).slice(0,__dirname.split(path.sep).length-1).join(path.sep);
const variables = require(path.join(rootDir, "variables.js"));
const database = variables.database;

router.get("/", (req, res) => {
    const username = req.session.username;
    if(!username) return res.json({ msg : "failure" });
    client.connect(database, (err, db) => {
        if(err){
            db.close();
            return res.json({ msg : "failure" });
        }
        const dbo = db.db("online-coding");
        const collection = "problems";
        const query = {};
        dbo.collection(collection).find(query).toArray((err, result) => {
            if(err || !result){
                db.close();
                return res.json({msg : "failure"});
            }
            console.log(result);
            return res.json({ msg : "success", problems : result });
        });
    });
});

module.exports = router;