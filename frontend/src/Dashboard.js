import React from "react";
import { api } from "./variables";
import axios  from "axios";

class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {username : "", display: false};
        this.logOut = (e) => {
            e.preventDefault();
            axios.get(api+"/logout", { withCredentials : true }).then(res => res.data)
            .then(data => window.location.href = "/");
        }
    }
    render() {
        if(this.state.display !== true) return <React.Fragment></React.Fragment>;
        return (
            <div>
                <h1>Welcome {this.state.username}</h1>
                <br></br>
                <button onClick={this.logOut}>Log Out</button>
                <div>
                    <h2>Statistics</h2>
                </div>
                <div>
                    <h2>History</h2>
                </div>
                <div>
                    <h2>Problems</h2>
                </div>
            </div>
        );
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