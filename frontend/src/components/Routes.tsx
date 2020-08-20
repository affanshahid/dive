import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import CreateWorkflow from './designer/CreateWorkflow';
import ViewWorkflow from './designer/ViewWorkflow';
import Home from './home/Home';
import Workflows from './workflows/Workflows';

function Routes() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/workflows" exact component={Workflows} />
        <Route path="/designer" exact component={CreateWorkflow} />
        <Route path="/designer/:workflowId" component={ViewWorkflow} />
      </Switch>
    </Router>
  );
}

export default Routes;
