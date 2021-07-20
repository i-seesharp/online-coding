import React from "react";

class ProblemRow extends React.Component {
    constructor(props){
        super(props);
        this.state = { title : this.props.title || "",
                        id : this.props.id || 0,
                        acceptance : this.props.acceptance || "0%",
                        difficulty: this.props.difficulty || "hard",
                        url : this.props.url};
        this.goToProblem = () => {
            if(!this.state.url) return;
            window.location.href = `/problem?question=${this.state.url}`;
        }
    }
    static getDerivedStateFromProps(props, state) {
        state.title = props.title || "";
        state.id = props.id || 0;
        state.acceptance = props.acceptance || "0%";
        state.difficulty = props.difficulty || "hard";
        state.url = props.url;
        return state;
    }
    render() {
        let color = "bg-green-700";
        if(this.state.difficulty === "medium") color = "bg-yellow-500";
        if(this.state.difficulty === "hard") color = "bg-red-700";
        return (
            <tr onClick={this.goToProblem} className="cursor-pointer text-black bg-gray-500 hover:bg-gray-900 hover:text-white">
                <td className="p-3">
                    <div className="flex align-items-center">
                        <div className="ml-3">
                            <div className=" items-center text-center">{this.state.id}</div>
                        </div>
                    </div>
                </td>
                <td className="p-3">
                    {this.state.title}
                </td>
                <td className="p-3">
                    <span className={`${color} text-gray-50 rounded-md px-2`}>{this.state.difficulty}</span>
                </td>
                <td className="p-3 ">
                    <a href="/" className="mr-2">
                        <i className="material-icons-outlined text-base">{this.state.acceptance}</i>
                    </a>
                </td>
            </tr>
        );
    }
}

export default ProblemRow;