const path = require("path");
const express = require("express");
const router = express.Router();

router.get("/logout", (req, res) => {
    if(req.session.authenticated !== true) return res.redirect("/login");
    req.session.authenticated = undefined;
    req.session.username = undefined;
    res.status(200).json({ msg : "Successfully Logged Out!"});
});

module.exports = router;