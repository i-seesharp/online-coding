import React from "react";
import axios from "axios";
import { api } from "./variables";
import Card from "./Card";

class Solved extends React.Component {
    constructor(props){
        super(props);
        this.state = { username : this.props.username || "", easy : 0, medium : 0, hard : 0};
    }

    render() {
        return (
            <div className="max-w-screen-lg flex flex-1 top-20 left-72">
                <Card solved={this.state.easy} tag={"Easy"} hover={"bg-green-700"} />
                <Card solved={this.state.medium} tag={"Medium"} hover={"bg-yellow-500"} />
                <Card solved={this.state.hard} tag={"Hard"} hover={"bg-red-700"} />
            </div>
        );
    }
    componentDidMount() {
        axios.get(api+"/statistics/solved", { withCredentials : true })
        .then(res => res.data).then(data => {
            console.log(data);
            if(data.msg === "success"){
                this.setState({ easy: data.easy, medium: data.medium, hard: data.hard });
            }else {
                console.log(data);
            }
        })
    }
}

export default Solved;