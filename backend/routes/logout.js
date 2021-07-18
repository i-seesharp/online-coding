const path = require("path");
const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    if(req.session.authenticated !== true) return res.json({msg:"failure"});
    req.session.authenticated = undefined;
    req.session.username = undefined;
    req.session.destroy();
    res.status(200).json({ msg : "success"});
});

module.exports = router;