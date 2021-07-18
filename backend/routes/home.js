const path = require("path");
const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    if(req.session.authenticated !== true) return res.redirect("/login");
    res.status(200).json({msg : `Hello ${req.session.username}`});
});

module.exports = router;