import React from "react";
import axios from "axios";
import { api } from "./variables";

class Landing extends React.Component {
    constructor(props){
        super(props);
        this.state = {username: "", password: "", display : false};
        this.handleChange = (e) => {
            const field = e.target.name;
            const value = e.target.value;
            this.setState({ [field] : value });
        }
        this.handleSubmit = (e) => {
            e.preventDefault();
            axios.get(api+"/login", {
                withCredentials: true,
                params: { username : this.state.username, password : this.state.password }
            }).then(res => res.data)
            .then(data => {
                if(data.msg === "success") window.location.href = "/dashboard";
                else this.setState({ username : "", password : "" });
            });
        }
    }
    render() {
        if(this.state.display !== true) return <React.Fragment></React.Fragment>;
        return (
            <div>
                <h1>Landing Page!</h1>
                <form onSubmit={this.handleSubmit}>
                    <label>Username: </label>
                    <input type="text" name="username" onChange={this.handleChange} value={this.state.username}></input>
                    <br></br>
                    <label>Password: </label>
                    <input type="password" name="password" onChange={this.handleChange} value={this.state.password}></input>
                    <br></br>
                    <button type="submit">Log In</button>
                </form>
            </div>
        );
    }
    componentDidMount() {
        axios.get(api+"/authenticated", { withCredentials : true }).then(res => res.data)
        .then(data => {
            if(data.msg === "success") window.location.href = "/dashboard";
            else this.setState({ display : true });
        });
    }
}

export default Landing;