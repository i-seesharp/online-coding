const path = require("path");
const express = require("express");
const router = express.Router();
const client = require("mongodb").MongoClient;
const { createBrotliCompress } = require("zlib");
const { builtinModules } = require("module");
const rootDir = __dirname.split(path.sep).slice(0, __dirname.split(path.sep).length-1).join(path.sep);
const variables = require(path.join(rootDir, "variables.js"));
const database = variables.database;

router.post("/", (req, res) => {
    const username = req.body.username.trim();
    const password = req.body.password.trim();
    const confirm = req.body.confirm.trim();
    const flashMessages = [];
    if(username.length < 4) flashMessages.push("Username needs to be more than 4 characters.");
    if(password.length < 6) flashMessages.push("Password needs to be atleast 6 characters long.");
    if(password !== confirm) flashMessages.push("Passwords do not match.");

    client.connect(database, (err, db) => {
        if(err){
            db.close();
            return res.status(500).json({ msg: "failure" , flash : flashMessages });
        }
        let dbo = db.db("online-coding");
        let collection = "users";
        let query = { username : username };
        dbo.collection(collection).findOne(query, (err, result) => {
            if(err){
                db.close();
                return res.status(500).json({ msg: "failure" , flash : flashMessages });
            }
            if(result !== undefined){
                flashMessages.push("Username has already been taken.");
                db.close();
                return res.status(500).json({ msg: "failure" , flash : flashMessages });
            }
            let document = {username : username, password : password};
            dbo.collection(collection).insertOne(document, (err, result) => {
                if(err){
                    db.close();
                    return res.status(500).json({ msg: "failure" , flash : flashMessages });
                }
                db.close();
                console.log("Just inserted : " + username);
                return res.status(200).json({ msg : "success", username : username });
            });
        });
    });
});

module.exports = router;