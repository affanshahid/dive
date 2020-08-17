import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Designer from "./designer/Designer";
import Home from "./home/Home";
import Workflows from "./workflows/Workflows";

function Routes() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/designer" component={Designer} />
        <Route path="/workflows" component={Workflows} />
      </Switch>
    </Router>
  );
}

export default Routes;
