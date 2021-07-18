const path = require("path");
const http = require("http");
const cors = require("cors");
const express = require("express");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const socketio = require("socket.io");
const { cookie } = require("./variables");
const variables = require(path.join(__dirname, "variables.js"));
const app = express();
const server = http.createServer(app);
const sessionStore = session.MemoryStore();
const PORT = process.env.PORT || variables.port;
const io = socketio(server, {
    cors: {
        credentials: variables.credentials,
        origin: variables.origin
    }
});

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

app.use("/", require(homeRoute));
app.use("/login", require(loginRoute));
app.use("/logout", require(logoutRoute));

server.listen(PORT, () => {
    console.log("Listening on port : "+PORT);
});