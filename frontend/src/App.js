import React from "react";
import SignUp from "./SignUp";
import Dashboard from "./Dashboard";
import Landing from "./Landing";
import Problem from "./Problem";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
class App extends React.Component {
    render() {
        return(
            <Router>
                <Switch>
                    <Route exact path="/"><Landing /></Route>
                    <Route exact path="/dashboard"><Dashboard /></Route>
                    <Route exact path="/signup"><SignUp /></Route>
                    <Route exact path="/problem"><Problem /></Route>
                    <Route path="*"><h1>{404}</h1></Route>
                </Switch>
            </Router>
        );
    }
}

export default App;