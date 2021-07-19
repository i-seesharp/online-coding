import React from "react";
import "./index.css";
import axios from "axios";
import { api } from "./variables";

class LogIn extends React.Component {
    constructor(props) {
        super(props);
        this.state = { username : "", password : ""};
        this.handleChange = (e) => {
            const field = e.target.name;
            const value = e.target.value;
            this.setState({ [field] : value });
        }
        this.handleSubmit = (e) => {
            e.preventDefault();
            const username = this.state.username;
            const password = this.state.password;
            axios.get(api+"/login", {
                withCredentials: true,
                params: {
                    username: username,
                    password: password
                }
            }).then(res => res.data).then(data => {
                console.log(data);
                if(data.msg === "success") window.location.href = "/dashboard";
                else this.setState({ username : "", password : "" });
            });
        }
    }
    render() {
        return (
            <div className="float-right mb-80 flex-2 mr-60 max-h-10">
                <div className="w-full top-2">
                <form onSubmit={this.handleSubmit} className="bg-black shadow-md rounded px-8 pt-6 pb-8 mb-4">
                  <div className="mb-4">
                    <label className="block text-white text-sm font-bold mb-2" for="username">
                      Username
                    </label>
                    <input onChange={this.handleChange} value={this.state.username} name="username" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Username" />
                  </div>
                  <div className="mb-6">
                    <label class="block text-white text-sm font-bold mb-2" for="password">
                      Password
                    </label>
                    <input onChange={this.handleChange} value={this.state.password} name="password" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="******************" />
                  </div>
                  <div className="flex items-center justify-between mx-20">
                    <button type="submit" id="navAction" className="mx-50 bg-white lg:mx-0 hover:underline text-gray-800 font-extrabold rounded mt-4 lg:mt-0 py-4 px-8 shadow opacity-100">
                        Log In
                    </button>
                  </div>
                </form>
              </div>
            </div>
        );
    }
}

export default LogIn;