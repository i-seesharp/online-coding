import React from "react";

class Card extends React.Component {
    constructor(props) {
        super(props);
        this.state = { solved : this.props.solved || 0,
             tag : this.props.tag || "", hover : this.props.hover || "bg-gray-700"};
    }
    static getDerivedStateFromProps(props, state) {
        state.solved = props.solved;
        state.tag = props.tag;
        state.hover = props.hover;
        return state;
    }
    render() {
        return (
        <div className={`w-full shadow-lg hover:shadow-2xl bg-gray-700 border-l-8 hover:${this.state.hover} border-red-vibrant-dark mb-2 p-2 w-1/5 mx-2`}>
            <div className="p-4 flex flex-col">
                <a href="#" className="no-underline text-white text-2xl">
                    {this.state.solved}
                </a>
                <a href="#" className="no-underline text-white text-lg">
                    Solved : {this.state.tag}
                </a>
            </div>
        </div>
        );
    }
}

export default Card;