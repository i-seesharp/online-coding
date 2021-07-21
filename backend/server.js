const path = require("path");
const http = require("http");
const cors = require("cors");
const express = require("express");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const client = require("mongodb").MongoClient;
const variables = require(path.join(__dirname, "variables.js"));
const app = express();
const server = http.createServer(app);
const sessionStore = session.MemoryStore();
const PORT = process.env.PORT || variables.port;
const database = variables.database;

app.use(cors({ credentials: variables.credentials, origin: variables.origin }));
app.use(express.json());
app.use(cookieParser(variables.cookie));
app.use(session({
    cookie: { maxAge: 1000*60*60 },
    secret: variables.session,
    store: sessionStore,
    resave: true,
    saveUninitialized: false
}));

const homeRoute = path.join(__dirname, "routes", "home.js");
const loginRoute = path.join(__dirname, "routes", "login.js");
const logoutRoute = path.join(__dirname, "routes", "logout.js");
const authenRoute = path.join(__dirname, "routes", "authenticated.js");
const signupRoute = path.join(__dirname, "routes", "signup.js");
const statsRoute = path.join(__dirname, "routes", "statistics.js");
const problemsRoute  = path.join(__dirname, "routes", "problems.js");
const problemRoute = path.join(__dirname, "routes", "problem.js");

app.use((req, res, next) => {
    console.log(req.url);
    next();
});

app.use("/", require(homeRoute));
app.use("/login", require(loginRoute));
app.use("/logout", require(logoutRoute));
app.use("/authenticated", require(authenRoute));
app.use("/signup", require(signupRoute));
app.use("/statistics", require(statsRoute));
app.use("/problems", require(problemsRoute));
app.use("/problem", require(problemRoute));

server.listen(PORT, () => {
    console.log("Listening on port : "+PORT);
});