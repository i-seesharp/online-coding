const path = require("path");
const express = require("express");
const router = express.Router();
const client = require("mongodb").MongoClient;
const rootDir = __dirname.split(path.sep).slice(0,__dirname.split(path.sep).length-1).join(path.sep);
const variables = require(path.join(rootDir, "variables.js"));
const database = variables.database;

router.get("/", (req, res) => {
    if(req.session.authenticated !== true) return res.redirect("/login");
    res.status(200).json({msg : `Hello ${req.session.username}`});
});

module.exports = router;