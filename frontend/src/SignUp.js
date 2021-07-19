import axios from "axios";
import React from "react";
import { api } from "./variables";
import "./index.css";

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
                console.log(data);
                if(data.msg === "success"){
                    console.log(data);
                    window.location.href = "/dashboard";
                }else{
                    this.setState({ username: "", password: "", confirm: "", flashMessages: data.flash });
                }
            });
        }
        this.logIn = (e) => {
            e.preventDefault();
            window.location.href = "/";
        }
    }
    render() {
        const flashes = this.state.flashMessages.map((message, index) => <li key={index}>{message}</li>);
        return (
            <div className="float-right mb-80 flex-2 mr-60 max-h-10">
                <div className="w-full">
                <form onSubmit={this.handleSubmit} className="bg-black shadow-md rounded px-8 pt-6 pb-8 mb-4">
                  <div class="mb-4">
                    <label class="block text-white text-sm font-bold mb-2" for="username">
                      Username
                    </label>
                    <input onChange={this.handleChange} value={this.state.username} name="username" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Username" />
                  </div>
                  <div class="mb-4">
                    <label class="block text-white text-sm font-bold mb-2" for="password">
                      Password
                    </label>
                    <input onChange={this.handleChange} value={this.state.password} name="password" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="******************" />
                  </div>
                  <div className="mb-6">
                    <label class="block text-white text-sm font-bold mb-2" for="password">
                        Confirm Password
                    </label>
                    <input onChange={this.handleChange} value={this.state.confirm} name="confirm" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="confirm" type="password" placeholder="******************" />
                  </div>
                  <div class="flex items-center justify-between mx-20">
                    <button type="submit" id="navAction" className="mx-50 bg-white lg:mx-0 hover:underline text-gray-800 font-extrabold rounded mt-4 lg:mt-0 py-4 px-8 shadow opacity-100">
                        Sign Up
                    </button>
                  </div>
                </form>
              </div>
            </div>
        );
    }
    componentDidMount() {
        axios.get(api+"/authenticated", {withCredentials : true }).then(res => res.data)
        .then(data => {
            if(data.msg === "success") window.location.href = "/";
            else this.setState({ display : true });
        });
    }
}

export default SignUp;