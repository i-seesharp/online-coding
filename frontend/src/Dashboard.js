import React from "react";
import { api } from "./variables";
import axios  from "axios";

class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {username : "", display: false};
    }
    render() {
        if(this.state.display !== true) return <React.Fragment></React.Fragment>;
        return <h1>Welcome {this.state.username}</h1>;
    }
    componentDidMount() {
        axios.get(api+"/authenticated", {withCredentials : true}).then(res => res.data)
        .then(data => {
            if(data.msg === "success"){
                this.setState({username : data.username, display : true });
            }else{
                window.location.href = "/";
            }
        })
    }
}

export default Dashboard;