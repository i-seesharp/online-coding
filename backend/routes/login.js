const path = require("path");
const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    if(req.session.authenticated === true) return res.redirect("/");
    req.session.authenticated = true;
    req.session.username = "Aaranya";
    res.status(200).json({msg : `Logged In!`});
});

module.exports = router;