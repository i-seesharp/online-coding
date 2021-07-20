import React from "react";
import { api } from "./variables";
import axios  from "axios";
import Solved from "./Solved";
import Problems from "./Problems";

class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {username : "", display: false};
        this.logOut = (e) => {
            e.preventDefault();
            axios.get(api+"/logout", { withCredentials : true }).then(res => res.data)
            .then(data => window.location.href = "/");
        }
    }
    render() {
        if(this.state.display !== true) return <React.Fragment></React.Fragment>;
        return (
            <React.Fragment>
                <nav className="md:left-0 md:block md:fixed md:top-0 md:bottom-0 md:overflow-y-auto md:flex-row md:flex-nowrap md:overflow-hidden shadow-xl bg-gray-700 flex flex-wrap items-center justify-between relative md:w-64 z-10 py-4 px-6 text-white">
                    <div className="md:flex-col md:items-stretch md:min-h-full md:flex-nowrap px-0 flex flex-wrap items-center justify-between w-full mx-auto">
                        <button className="cursor-pointer text-black opacity-50 md:hidden px-3 py-1 text-xl leading-none bg-transparent rounded border border-solid border-transparent" type="button">
                            <i className="fas fa-bars"></i>
                        </button>
                        <button onClick={this.logOut} className="md:block text-left md:pb-2 text-blueGray-600 mr-0 inline-block whitespace-nowrap text-sm uppercase font-bold p-4 px-0" href="#/">
                            LOG OUT
                        </button>
                        <ul className="md:hidden items-center flex flex-wrap list-none">
                            <li className="inline-block relative">
                                <a className="text-blueGray-500 block py-1 px-3" href="#pablo">
                                    <i className="fas fa-bell"></i>
                                </a>
                                <div className="hidden bg-white text-base z-50 float-left py-2 list-none text-left rounded shadow-lg mt-1 min-w-48">
                                    <a href="#pablo" className="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700">
                                        Action
                                    </a>
                                    <a href="#pablo" className="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700">
                                        Another action
                                    </a>
                                    <a href="#pablo" className="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700">
                                        Something else here
                                    </a>
                                    <div className="h-0 my-2 border border-solid border-blueGray-100">
                                    </div>
                                    <a href="#pablo" className="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700">
                                        Seprated link
                                    </a>
                                </div>
                            </li>
                            <li className="inline-block relative">
                                <a className="text-blueGray-500 block" href="#pablo">
                                    <div className="items-center flex">
                                        <span className="w-12 h-12 text-sm text-white bg-blueGray-200 inline-flex items-center justify-center rounded-full">
                                            <img alt="..." className="w-full rounded-full align-middle border-none shadow-lg" src="/notus-react/static/media/team-1-800x800.fa5a7ac2.jpg" />
                                        </span>
                                    </div>
                                </a>
                                <div className="hidden bg-white text-base z-50 float-left py-2 list-none text-left rounded shadow-lg min-w-48">
                                    <a href="#pablo" className="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700">
                                        Action
                                    </a>
                                    <a href="#pablo" className="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700">
                                        Another action
                                    </a>
                                    <a href="#pablo" className="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700">
                                        Something else here
                                    </a>
                                    <div className="h-0 my-2 border border-solid border-blueGray-100"></div>
                                    <a href="#pablo" className="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700">
                                        Seprated link
                                    </a>
                                </div>
                            </li>
                        </ul>
                        <div className="md:flex md:flex-col md:items-stretch md:opacity-100 md:relative md:mt-4 md:shadow-none shadow absolute top-0 left-0 right-0 z-40 overflow-y-auto overflow-x-hidden h-auto items-center flex-1 rounded hidden">
                            <div className="md:min-w-full md:hidden block pb-4 mb-4 border-b border-solid border-blueGray-200">
                                <div className="flex flex-wrap">
                                    <div className="w-6/12">
                                        <a className="md:block text-left md:pb-2 text-blueGray-600 mr-0 inline-block whitespace-nowrap text-sm uppercase font-bold p-4 px-0" href="#/">
                                            Notus React
                                        </a>
                                    </div>
                                    <div className="w-6/12 flex justify-end">
                                        <button type="button" className="cursor-pointer text-black opacity-50 md:hidden px-3 py-1 text-xl leading-none bg-transparent rounded border border-solid border-transparent">
                                            <i className="fas fa-times"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <form className="mt-6 mb-4 md:hidden">
                                <div className="mb-3 pt-0">
                                    <input type="text" placeholder="Search" className="border-0 px-3 py-2 h-12 border border-solid  border-blueGray-500 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-base leading-snug shadow-none outline-none focus:outline-none w-full font-normal" />
                                </div>
                            </form>
                            <hr className="my-4 md:min-w-full"/>
                            <h6 className="md:min-w-full text-blueGray-500 text-xs uppercase font-bold block pt-1 pb-4 no-underline">
                                Recent History
                            </h6>
                        </div>
                    </div>
                </nav>
                <h1 className="max-w-screen-md font-bold relative left-72 top-10 text-2xl">Welcome @{this.state.username}, </h1>
                <div className=" max-w-screen-lg relative top-20 left-80">
                    <Solved username={this.state.username} />
                </div>
                <div className="relative left-80 top-40 w-2/3">
                    <Problems username={this.state.username}/>
                </div>
            </React.Fragment>      
        );
    }
    componentDidMount() {
        axios.get(api+"/authenticated", {withCredentials : true}).then(res => res.data)
        .then(data => {
            if(data.msg === "success"){
                this.setState({username : data.username, display : true });
            }else{
                window.location.href = "/";
            }
        })
    }
}

export default Dashboard;