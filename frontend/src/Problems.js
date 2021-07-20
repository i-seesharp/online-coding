import React from "react";
import axios from "axios";
import { api } from "./variables";
import ProblemRow from "./ProblemRow";

class Problems extends React.Component {
    constructor(props) {
        super(props);
        this.state = { username : this.props.username || "", problems : [], search : ""};
        this.problems = [];
        this.handleChange = (e) => {
            const field = e.target.name;
            const value = e.target.value;
            this.setState({ [field] : value , 
                problems : this.problems.filter((problem) => {
                    return problem.title.includes(value);
                })
            });
        }
        this.getProblems = () => {
            axios.get(api+"/problems", {
                withCredentials: true,
                query: this.state.search
            }).then(res => res.data).then(data => {
                if(data.msg === "success") {
                    this.problems = data.problems;
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
        let problems = this.state.problems.map((problem, index) => {
            return <ProblemRow id={index+1} title={problem.title} difficulty={problem.difficulty}
                        acceptance={problem.acceptance} url={problem.url} />
        });
        return (
                <div class="">
                    <div class="pt-2 relative mx-auto text-gray-600">
                        <input class="border-2 border-gray-300 bg-white w-96 h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none"
                        type="search" name="search" placeholder="Search" value={this.state.search} onChange={this.handleChange} />
                    </div>
                    <div class=" relative top-10 overflow-auto lg:overflow-visible ">
                        <table class="pb-5 bg-transparent table text-gray-400 border-separate space-y-6 text-sm w-full">
                            <thead class="bg-gray-800 text-gray-100">
                                <tr>
                                    <th class="p-3">ID</th>
                                    <th class="p-3 text-left">Problem</th>
                                    <th class="p-3 text-left">Difficulty</th>
                                    <th class="p-3 text-left">Acceptance</th>
                                </tr>
                            </thead>
                            <tbody>
                                {problems}
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