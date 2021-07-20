import React from "react";
import axios from "axios";
import { api } from "./variables";
import ProblemRow from "./ProblemRow";

class Problems extends React.Component {
    constructor(props) {
        super(props);
        this.state = { username : this.props.username || "", problems : [], query : "" };
        this.getProblems = () => {
            axios.get(api+"/problems", {
                withCredentials: true,
                query: this.state.query
            }).then(res => res.data).then(data => {
                if(data.msg === "success") {
                    this.setState({ problems : data.problems });
                }else {
                    console.log(data);
                }
            });
        }
    }
    static getDerivedStateFromProps(props, state) {
        state.username = props.username;
        return state;
    }
    render() {
        return (
                <div class="">
                    <div class="overflow-auto lg:overflow-visible ">
                        <table class="bg-transparent table text-gray-400 border-separate space-y-6 text-sm w-full">
                            <thead class="bg-gray-800 text-gray-100">
                                <tr>
                                    <th class="p-3">ID</th>
                                    <th class="p-3 text-left">Problem</th>
                                    <th class="p-3 text-left">Difficulty</th>
                                    <th class="p-3 text-left">Acceptance</th>
                                </tr>
                            </thead>
                            <tbody>
                                <ProblemRow id={1} title={"Two Sum"} difficulty={"easy"} acceptance={"40%"} url ={"p8b678v51gy09"}/>
                            </tbody>
                        </table>
                    </div>
                </div>
        );
    }
    componentDidMount() {
        this.getProblems();
    }
}

export default Problems;