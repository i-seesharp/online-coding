import React from "react";
import axios from "axios";
import { io } from "socket.io-client";
import { api } from "./variables";
class App extends React.Component {
    constructor() {
        super();
        this.state = {text: ""};
    }
    render() {
        return <h1>{this.state.text}</h1>
    }
    componentDidMount() {
        setTimeout(() => {
            axios.get(api, { withCredentials: true }).then(res => res.data)
            .then(data => this.setState({ text: data.msg }));
        }, 3000);
    }
}

export default App;