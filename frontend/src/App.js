import React from "react";
import axios from "axios";
import { io } from "socket.io-client";
class App extends React.Component {
    constructor() {
        super();
        this.state = {text: ""};
        this.socket = io("http://localhost:5000/");
    }
    render() {
        return <h1>{this.state.title}</h1>
    }
}

export default App;