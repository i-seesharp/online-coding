const path = require("path");
const express = require("express");
const router = express.Router();
const client = require("mongodb").MongoClient;
const rootDir = __dirname.split(path.sep).slice(0, __dirname.split(path.sep).length-1).join(path.sep);
const variables = require(path.join(rootDir, "variables.js"));
const database = variables.database;

router.get("/", (req, res) => {
    if(req.session.authenticated === true) {
        let data = { msg : "Already Logged In!"};
        return res.status(200).json(data);
    }
    console.log(req.query);
    const username = req.query.username;
    const password = req.query.password;
    client.connect(database, (err, db) => {
        if(err){
            db.close();
            return res.status(500).json({ msg: "error"});
        }
        let dbo = db.db("online-coding");
        let collection = "users";
        let query = {"username" : username};
        dbo.collection(collection).findOne(query, (err, result) => {
            if(err){
                db.close();
                return res.status(500).json({ msg: "error"});
            }
            if(result === undefined){
                db.close();
                return res.status(200).json({ msg : "failure"});
            }
            if(password === result.password){
                req.session.authenticated = true;
                req.session.username = username;
                db.close();
                return res.status(200).json({ msg : "success", username : username });
            }
            db.close();
            return res.status(200).json({ msg : "failure"});
        });
    });
});

module.exports = router;