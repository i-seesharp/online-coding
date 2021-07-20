import React from "react";
import Dashboard from "./Dashboard";
import Landing from "./Landing";
import Problem from "./Problem";
import NotFound from "./NotFound";
import "./index.css";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

class App extends React.Component {
    render() {
        return(
            <Router>
                <Switch>
                    <Route exact path="/" component={Landing} />
                    <Route exact path="/dashboard" component={Dashboard} />
                    <Route exact path="/problem" component={Problem} />
                    <Route path="*" component={NotFound} />
                </Switch>
            </Router>
        );
    }
}

export default App;