const http = require("http");
const path = require("path");
const express = require("express");
const variables = require(path.join(__dirname, "variables.js"));
const socketio = require("socket.io");
const server = http.createServer(app);
const cors = require("cors");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const sessionStore = session.MemoryStore();
const io = socketio(server, {
    cors : {
        credentials: variables.credentials,
        origin: variables.origin
    }
});
app.use(cors({credentials : true, origin: variables.origin}));
app.use(express.json());
app.use(cookieParser(variables.cookie));
app.use(session({
    secret: variables.session,
    cookie: { maxAge: 1000*60*60 },
    resave: true,
    saveUninitialized: false,
    store: sessionStore
}));

io.on("connection", socket => console.log(socket.id));

