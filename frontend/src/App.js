import React from "react";
import axios from "axios";
import { api } from "./variables";
import SignUp from "./SignUp";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {username: "", password: "", loggedIn: false};
        this.handleChange = (e) => {
            const field = e.target.name;
            const value = e.target.value;
            this.setState((state, props) => {
                state[field] = value;
                return state;
            });
        }
        this.handleSubmit = (e) => {
            e.preventDefault();
            axios.get(api+"/login", { withCredentials: true, 
                params: { username: this.state.username, password: this.state.password }
            }).then(res => res.data).then(data => {
                if(data.msg === "success"){
                    this.setState({ loggedIn: true, username : data.username });
                }
            });
        }
        this.logOut = (e) => {
            e.preventDefault();
            axios.get(api+"/logout", { withCredentials : true }).then(res => res.data)
            .then(data => {
                if(data.msg === "success"){
                    this.setState({ username : "", password: "", loggedIn: false });
                }
            });
        }
    }
    render() {
        /*
        console.log(this.props._locals);
        const logIn =  (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <input type="text" name="username" value={this.state.username} onChange={this.handleChange}></input>
                    <br></br>
                    <input type="password" name="password" value={this.state.password} onChange={this.handleChange}></input>
                    <br></br>
                    <button type="submit">Login</button>
                </form>
            </div>
        );

        const logOut = (
            <div>
                <h1>Welcome, {this.state.username} </h1>
                <button onClick={this.logOut}>Log Out!</button>
            </div>
        );
        if(this.state.loggedIn) return logOut;
        return logIn;
        */
       return <SignUp />
    }
    componentDidMount() {
        axios.get(api+"/authenticated", {withCredentials : true}).then(res => res.data)
        .then(data => {
            if(data.msg === "success"){
                this.setState({ loggedIn : true, username : data.username });
            }
        });
    }
}

export default App;