import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Designer from "./designer/Designer";
import Home from "./home/Home";

function Routes() {
  return (
    <Router>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/designer" component={Designer} />
      </Switch>
    </Router>
  );
}

export default Routes;
