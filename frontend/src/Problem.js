import React from "react";
import { api, defaultQuestionId } from "./variables";
import axios from "axios";
import  queryString  from "query-string";
import AceEditor from "react-ace";

import "ace-builds/src-noconflict/mode-c_cpp";
import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/theme-github";


class Problem extends React.Component {
    constructor(props){
        super(props);
        this.parsedQuery = queryString.parse(this.props.location.search);
        const question = this.parsedQuery.question || defaultQuestionId;
        this.state = {username : "", display : false, question : question, code: "", output: ">>",
                        title: "", language : "C++", font: "15px", mode: "c_cpp", templates : {} ,
                        description: ""};
        this.handleChange = (e) => {
            this.setState({ code : e });
        }
        this.langChange = (e) => {
            const field = e.target.innerText;
            let targetMode = "c_cpp";
            if(field === "Java") targetMode = "java";
            else if(field === "JavaScript") targetMode = "javascript";
            else if(field === "Python3") targetMode = "python";
            this.setState((prevState, prevProps) => {
                prevState.language = field;
                prevState.mode = targetMode;
                prevState.code = prevState.templates[targetMode];
                return prevState;
            });
        }
        this.fontChange = (e) => {
            console.log(e);
            this.setState( { font : e.target.innerText });
        }
    }
    render() {
        if(this.state.display !== true) return <React.Fragment></React.Fragment>;
        return (
            <div className="flex overflow-hidden">
                <div className="overflow-hidden relative bg-gray-700 w-5/12 h-10/12">
                    <button onClick = {() => window.location.href = "/dashboard"}className="hover:shadow-inner hover:bg-black hover:text-white text-black mt-5 ml-10 rounded-lg p-2 bg-white">
                        {"< Back to Dashboard"}
                    </button>
                    <div className="w-full h-full m-12 text-white">
                        <h1 className="text-3xl font-extrabold">{this.state.title}</h1>
                        <div className=" w-10/12 break-words mt-10 h-full">
                            <textarea readOnly className=" focus:outline-none resize-none w-full h-full bg-gray-700 overflow-ellipsis overflow-hidden"
                                value={this.state.description}></textarea>  
                        </div>
                    </div>
                </div>
                <div className="relative w-7/12 overflow-hidden">
                    <div className="flex flex-row justify-center pt-2 pb-2 bg-gray-700">
                        <div>
                            <div class="dropdown">
                                <button class="mr-5 h-8 bg-gray-200 hover:bg-gray-700 hover:text-white shadow-xl rounded-lg px-5">{this.state.language}</button>
                                    <div class="dropdown-content">
                                        <a onClick={this.langChange}>C++</a>
                                        <a onClick={this.langChange}>Java</a>
                                        <a onClick={this.langChange}>JavaScript</a>
                                        <a onClick={this.langChange}>Python3</a>
                                    </div>
                            </div>
                        </div>
                        <div>
                            <div class="dropdown">
                                <button class="mr-5 h-8 bg-gray-200 hover:bg-gray-700 hover:text-white shadow-xl rounded-lg px-5">{this.state.font}</button>
                                    <div class="dropdown-content">
                                        <a onClick={this.fontChange}>14px</a>
                                        <a onClick={this.fontChange}>15px</a>
                                        <a onClick={this.fontChange}>16px</a>
                                        <a onClick={this.fontChange}>18px</a>
                                    </div>
                            </div>
                        </div>
                    </div>
                    <AceEditor mode={this.state.mode} theme="github" height="580px"
                        width="870px" fontSize={this.state.font} value={this.state.code}
                        onChange={this.handleChange} />
                    <div className="flex flex-row justify-end px-5 pt-2">
                        
                        <button className="mr-5 h-8 bg-gray-200 hover:bg-gray-700 hover:text-white shadow-xl rounded-lg px-5">Run Example Tests</button>
                        <button className=" h-8 bg-gray-200 hover:bg-green-700 hover:text-white shadow-xl rounded-lg px-5">Submit Code</button>
                    </div>
                    
                    <textarea
                        className="output bg-gray-700 h-52 pb-0 mb-0"
                        readOnly
                        value={this.state.output}
                        />
                </div>
            </div>
            
            
        );
    }
    componentDidMount() {
        axios.get(api+"/authenticated", { withCredentials : true }).then(res => res.data)
        .then(data => {
            if(data.msg === "success") return data;
            else window.location.href = "/";
        }).then(data => {
            const user = data.username;
            console.log("here!");
            axios.get(api+"/problem", {
                withCredentials: true,
                params: {
                    question: this.state.question
                }
            }).then(res => res.data).then(data => {
                console.log(data);
                if(data.msg === "success") this.setState({ display: true, username: user, title: data.title,
                            templates : data.templates, code : data.templates["c_cpp"] });
                else window.location.href = "/";
            })
            
        });
    }
}

export default Problem;