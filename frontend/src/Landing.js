import React from "react";
import axios from "axios";
import { api } from "./variables";
import "./index.css";
import LogIn from "./LogIn";
import SignUp from "./SignUp";


class Landing extends React.Component {
    constructor(props){
        super(props);
        this.state = {username: "", password: "", display : false, logIn: true};
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
        this.changeMode = (e) => {
            if(this.state.logIn === true) this.signUp(e);
            else this.logIn(e);
        }
        this.signUp = (e) => {
            e.preventDefault();
            this.setState({ logIn : false });
        }
        this.logIn = (e) => {
            e.preventDefault();
            this.setState({ logIn : true });
        }
    }
    render() {
        if(this.state.display !== true) return <React.Fragment></React.Fragment>;
        let component = <SignUp />;
        if(this.state.logIn === true) component = <LogIn />;
        return (
            <React.Fragment>
                <nav id="header" className="w-full z-30 top-0 text-white py-1 lg:py-6">
                    <div className="w-full container mx-auto flex flex-wrap items-center justify-between
                    mt-0 px-2 py-2 lg:py-6">
                        <div className="pl-4 flex items-center">
                            <a className="text-black no-underline hover:no-underline font-bold
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
                            <button onClick={this.changeMode} id="navAction" className="mx-auto lg:mx-0 hover:underline text-gray-800 font-extrabold rounded mt-4 lg:mt-0 py-4 px-8 shadow opacity-75">
                                {this.state.logIn === true ? "Sign Up" : "Log In"}
                            </button>
                        </div>
                    </div>
                </nav>
                <div className="wrapper flex-1 w-2/3">
                    <div className="static-txt">
                        Practice
                    </div>
                    <ul className="dynamic-txts">
                        <li>
                            <span>Backtracking</span>
                        </li>
                        <li>
                            <span>Dynamic Programming</span>
                        </li>
                        <li>
                            <span>Depth First Search</span>
                        </li>
                        <li>
                            <span>Breadth First Search</span>
                        </li>
                        <li>
                            <span>Binary Search</span>
                        </li>
                        <li>
                            <span>Sliding Window Technique</span>
                        </li>
                    </ul>
                    {/*
                    <button className="mx-auto lg:mx-0 hover:underline text-gray-800 font-extrabold rounded my-2 md:my-6 py-4 px-8 shadow-lg w-48">
                        Sign Up
                    </button>
                    <a href="/" className="inline-block mx-auto lg:mx-0 hover:underline bg-transparent text-gray-600 font-extrabold my-2 md:my-6 py-2 lg:py-4 px-8">View Additional Action</a>

                    <div className="flex items-center w-full mx-auto content-end">
                    <div className="browser-mockup flex flex-1 m-6 md:px-0 md:m-12 bg-white w-1/2 rounded shadow-xl"></div>
                    </div>
                    */}
                </div>
                <div className="items-center float-left w-1/2 pl-20 mt-10">
                    <div className="browser-mockup bg-gray-800 rounded shadow-xl">
                        <ul>
                            <li><span className="text-xs text-white px-3 py-2">{"import java.util.*;"}</span></li>
                            <li><span className="text-xs text-white px-3 py-2">{"import java.lang.*;"}</span></li>
                            <li><span className="text-xs text-white px-3 py-2">{" "}</span></li>
                            <li><span className="text-xs text-white px-3 py-2">{"public className Main {"}</span></li>
                            <li><span className="text-xs text-white px-5 py-2">{"public static void main(String[] args) {"}</span></li>
                            <li><span className="text-xs text-white px-7 py-2">{"Integer[] nums = new Integer[10];"}</span></li>
                            <li><span className="text-xs text-white px-7 py-2">{"for(int i=0;i<nums.length;i++) nums[i] = i+1;"}</span></li>
                            <li><span className="text-xs text-white px-7 py-2">{"int LIS = longestIncreasingSubsequence(nums);"}</span></li>
                            <li><span className="text-xs text-white px-7 py-2">{"System.out.println(LIS);"}</span></li>
                            <li><span className="text-xs text-white px-5 py-2">{"}"}</span></li>
                            <li><span className="text-xs text-white px-5 py-2">{"public static int longestIncreasingSubsequence(Integer[] nums) {"}</span></li>
                            <li><span className="text-xs text-white px-7 py-2">{"int[] dp = new int[nums.length];"}</span></li>
                            <li><span className="text-xs text-white px-7 py-2">{"for(int i=0;i<dp.length;i++) dp[i] = 1;"}</span></li>
                            <li><span className="text-xs text-white px-7 py-2">{"for(int i=1;i<dp.length;i++) {"}</span></li>
                            <li><span className="text-xs text-white px-9 py-2">{"for(int j=0;j<i;j++) {"}</span></li>
                            <li><span className="text-xs text-white px-11 py-2">{"if(nums[j] >= nums[i]) continue;"}</span></li>
                            <li><span className="text-xs text-white px-11 py-2">{"dp[i] = Math.max(dp[i], dp[j] + 1);"}</span></li>
                            
                        </ul>
                    </div>
                </div>
                {component}
            </React.Fragment>
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