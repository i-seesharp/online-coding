import React from "react";
import axios from "axios";
import { api } from "./variables";
import "./index.css";


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
        this.signUp = (e) => {
            e.preventDefault();
            window.location.href = "/signup";
        }
    }
    render() {
        if(this.state.display !== true) return <React.Fragment></React.Fragment>;
        return (
            <div className="gradient leading-relaxed tracking-wide flex flex-col">
                <nav id="header" className="w-full z-30 top-0 text-white py-1 lg:py-6">
                    <div className="w-full container mx-auto flex flex-wrap items-center justify-between
                    mt-0 px-2 py-2 lg:py-6">
                        <div className="pl-4 flex items-center">
                            <a className="text-white no-underline hover:no-underline font-bold
                            text-2xl lg:text-4xl">
                                Online Coding
                            </a>
                        </div>
                        <div className="block lg:hidden pr-4">
                            <button id="nav-toggle" className="flex items-center px-3 py-2 border rounded text-gray-500 border-gray-600 hover:text-gray-800 hover:border-green-500 appearance-none focus:outline-none">
                            <svg className="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <title>Menu</title>
                                <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"></path>
                            </svg>
                            </button>
                        </div>
                        <div className="w-full flex-grow lg:flex lg:items-center lg:w-auto hidden lg:block mt-2 lg:mt-0 text-black p-4 lg:p-0 z-20" id="nav-content">
                            <ul className="list-reset lg:flex justify-end flex-1 items-center">
                                <li className="mr-3">
                                    <a className="inline-block py-2 px-4 text-black font-bold no-underline" href="#">About</a>
                                </li>
                                <li className="mr-3">
                                    <a className="inline-block text-black no-underline hover:text-gray-800 hover:text-underline py-2 px-4" href="/">Testimonials</a>
                                </li>
                                <li className="mr-3">
                                    <a className="inline-block text-black no-underline hover:text-gray-800 hover:text-underline py-2 px-4" href="http://github.com/i-seesharp">@i-seesharp</a>
                                </li>
                            </ul>
                            <button id="navAction" className="mx-auto lg:mx-0 hover:underline text-gray-800 font-extrabold rounded mt-4 lg:mt-0 py-4 px-8 shadow opacity-75">
                                Sign Up
                            </button>
                        </div>
                    </div>
                </nav>

            </div>
        );
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
                <br></br>
                <span>Don't have an account yet? </span>
                <button onClick={this.signUp}>Sign Up</button>
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