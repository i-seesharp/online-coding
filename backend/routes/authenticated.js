const path = require("path");
const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    if(req.session.authenticated !== true) return res.json({ msg: "failure" });
    return res.json({ msg:"success", username:req.session.username});
});

module.exports = router;