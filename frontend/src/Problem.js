import React from "react";
import { api, defaultQuestionId } from "./variables";
import axios from "axios";

class Problem extends React.Component {
    constructor(props){
        super(props);
        const question = this.props.question || defaultQuestionId;
        this.state = {username : "", display : false, question : question};
    }
    render() {
        if(this.state.display !== true) return <React.Fragment></React.Fragment>;
        return (
            <div>
                <div>
                    <h2>Problem Description</h2>
                </div>
                <div>
                    <h2>Code Editor</h2>
                </div>
            </div>
        );
    }
    componentDidMount() {
        axios.get(api+"/authenticated", { withCredentials : true }).then(res => res.data)
        .then(data => {
            if(data.msg === "success") this.setState({ display : true, username : data.username });
            else window.location.href = "/";
        });
    }
}

export default Problem;