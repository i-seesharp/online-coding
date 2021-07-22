const path = require("path");
const fs = require("fs");
const express = require("express");
const router = express.Router();
const client = require("mongodb").MongoClient;
const { fstat } = require("fs");
const rootDir = __dirname.split(path.sep).slice(0, __dirname.split(path.sep).length-1).join(path.sep);
const variables = require(path.join(rootDir, "variables.js"));
const database = variables.database;
const { exec } = require("child_process");
const cpp = path.join(__dirname, "processes", "cpp");
const java = path.join(__dirname, "processes", "java");
const python = path.join(__dirname, "processes", "python");

router.get("/9hr9jc90rc9h", (req, res) => {
    const code = req.query.code || "";
    const language = req.query.language || "";
    console.log(req.query);
    if(language === "C++"){
        const solutionPath = path.join(cpp, "solution.cpp");
        fs.writeFileSync(solutionPath, code);
        exec("g++ "+solutionPath+" "+path.join(cpp, "two_sum.cpp")+" && a.exe", { timeout : 10000 }, (err, stdout, stderr) => {
            if(err){
                console.log(err);
                return res.json({ msg : "failure", output: "Time Limit Exceeded\n>>" });
            }else if(stderr) {
                return res.json({ msg : "failure", output: stderr });
            }
            return res.status(200).json({msg : "success", output: stdout });
        });
    }else if(language === "Java"){
        const solutionPath = path.join(java, "Solution.Java");
        fs.writeFileSync(solutionPath, code);
        exec("cd "+path.join(java)+" && javac Solution.java TwoSum.java"+" && java TwoSum", { timeout : 10000 }, (err, stdout, stderr) => {
            if(err){
                console.log(err);
                return res.json({ msg : "failure", output: "Time Limit Exceeded\n>>" });
            }else if(stderr) {
                return res.json({ msg : "failure", output: stderr });
            }
            return res.status(200).json({msg : "success", output: stdout });
        });
    }else if(language === "Python3"){
        const solutionPath = path.join(python, "solution.py");
        fs.writeFileSync(solutionPath, code);
        exec("cd "+path.join(python)+" && python two_sum.py", { timeout : 10000 }, (err, stdout, stderr) => {
            if(err){
                console.log(err);
                if(err.killed === true) return res.json({ msg : "failure", output: "Time Limit Exceeded\n>>" });
                else return res.json({ msg : "failure", output : err.message});
            }else if(stderr) {
                return res.json({ msg : "failure", output: stderr });
            }
            return res.status(200).json({msg : "success", output: stdout });
        });
    }
    
    
});

module.exports = router;