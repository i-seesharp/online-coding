import axios from "axios";
import React from "react";
import { api } from "./variables";

class SignUp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {username: "", password: "", confirm: "", flashMessages: []};
        this.handleChange = (e) => {
            const field = e.target.name;
            const value = e.target.value;
            this.setState({ [field] : value });
        }
        this.handleSubmit = (e) => {
            e.preventDefault();
            axios.post(api+"/signup", {
                username: this.state.username,
                password: this.state.password,
                confirm: this.state.password
            }, { withCredentials : true }).then(res => res.data).then(data => {
                if(data.msg === "success"){
                    console.log(data);
                }else{
                    this.setState({ username: "", password: "", confirm: "", flashMessages: data.flash });
                }
            });
        }
    }
    render() {
        const flashes = this.state.flashMessages.map((message, index) => <li key={index}>{message}</li>);
        return (
            <div>
                <ul>{flashes}</ul>
                <form onSubmit={this.handleSubmit}>
                    <label>Username : </label>
                    <input type="text" name="username" value={this.state.username} onChange={this.handleChange}></input>
                    <br></br>
                    <label>Password : </label>
                    <input type="password" name="password" value={this.state.password} onChange={this.handleChange}></input>
                    <br></br>
                    <label>Confirm Password : </label>
                    <input type="password" name="confirm" value={this.state.confirm} onChange={this.handleChange}></input>
                    <br></br>
                    <button type="submit">Sign Up</button>
                </form>
            </div>
        );
    }
}

export default SignUp;