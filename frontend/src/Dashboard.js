import React from "react";
import { api } from "./variables";
import axios  from "axios";

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
                <nav class="md:left-0 md:block md:fixed md:top-0 md:bottom-0 md:overflow-y-auto md:flex-row md:flex-nowrap md:overflow-hidden shadow-xl bg-gray-700 flex flex-wrap items-center justify-between relative md:w-64 z-10 py-4 px-6 text-white">
                    <div class="md:flex-col md:items-stretch md:min-h-full md:flex-nowrap px-0 flex flex-wrap items-center justify-between w-full mx-auto">
                        <button class="cursor-pointer text-black opacity-50 md:hidden px-3 py-1 text-xl leading-none bg-transparent rounded border border-solid border-transparent" type="button">
                            <i class="fas fa-bars"></i>
                        </button>
                        <button onClick={this.logOut} class="md:block text-left md:pb-2 text-blueGray-600 mr-0 inline-block whitespace-nowrap text-sm uppercase font-bold p-4 px-0" href="#/">
                            LOG OUT
                        </button>
                        <ul class="md:hidden items-center flex flex-wrap list-none">
                            <li class="inline-block relative">
                                <a class="text-blueGray-500 block py-1 px-3" href="#pablo">
                                    <i class="fas fa-bell"></i>
                                </a>
                                <div class="hidden bg-white text-base z-50 float-left py-2 list-none text-left rounded shadow-lg mt-1 min-w-48">
                                    <a href="#pablo" class="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700">
                                        Action
                                    </a>
                                    <a href="#pablo" class="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700">
                                        Another action
                                    </a>
                                    <a href="#pablo" class="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700">
                                        Something else here
                                    </a>
                                    <div class="h-0 my-2 border border-solid border-blueGray-100">
                                    </div>
                                    <a href="#pablo" class="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700">
                                        Seprated link
                                    </a>
                                </div>
                            </li>
                            <li class="inline-block relative">
                                <a class="text-blueGray-500 block" href="#pablo">
                                    <div class="items-center flex">
                                        <span class="w-12 h-12 text-sm text-white bg-blueGray-200 inline-flex items-center justify-center rounded-full">
                                            <img alt="..." class="w-full rounded-full align-middle border-none shadow-lg" src="/notus-react/static/media/team-1-800x800.fa5a7ac2.jpg" />
                                        </span>
                                    </div>
                                </a>
                                <div class="hidden bg-white text-base z-50 float-left py-2 list-none text-left rounded shadow-lg min-w-48">
                                    <a href="#pablo" class="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700">
                                        Action
                                    </a>
                                    <a href="#pablo" class="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700">
                                        Another action
                                    </a>
                                    <a href="#pablo" class="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700">
                                        Something else here
                                    </a>
                                    <div class="h-0 my-2 border border-solid border-blueGray-100"></div>
                                    <a href="#pablo" class="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700">
                                        Seprated link
                                    </a>
                                </div>
                            </li>
                        </ul>
                        <div class="md:flex md:flex-col md:items-stretch md:opacity-100 md:relative md:mt-4 md:shadow-none shadow absolute top-0 left-0 right-0 z-40 overflow-y-auto overflow-x-hidden h-auto items-center flex-1 rounded hidden">
                            <div class="md:min-w-full md:hidden block pb-4 mb-4 border-b border-solid border-blueGray-200">
                                <div class="flex flex-wrap">
                                    <div class="w-6/12">
                                        <a class="md:block text-left md:pb-2 text-blueGray-600 mr-0 inline-block whitespace-nowrap text-sm uppercase font-bold p-4 px-0" href="#/">
                                            Notus React
                                        </a>
                                    </div>
                                    <div class="w-6/12 flex justify-end">
                                        <button type="button" class="cursor-pointer text-black opacity-50 md:hidden px-3 py-1 text-xl leading-none bg-transparent rounded border border-solid border-transparent">
                                            <i class="fas fa-times"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <form class="mt-6 mb-4 md:hidden">
                                <div class="mb-3 pt-0">
                                    <input type="text" placeholder="Search" class="border-0 px-3 py-2 h-12 border border-solid  border-blueGray-500 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-base leading-snug shadow-none outline-none focus:outline-none w-full font-normal" />
                                </div>
                            </form>
                            <hr class="my-4 md:min-w-full"/>
                            <h6 class="md:min-w-full text-blueGray-500 text-xs uppercase font-bold block pt-1 pb-4 no-underline">
                                Recent History
                            </h6>
                        </div>
                    </div>
                </nav>        
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