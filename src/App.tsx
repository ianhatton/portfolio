// Core
import React, { ReactElement } from "react";

// Pages
import CV from "./pages/cv/CV";
import Home from "./pages/home/Home";

// Vendor
import { HashRouter as Router, Route, Switch } from "react-router-dom";

const App = (): ReactElement => {
  return (
    <Router basename="/">
      <Switch>
        <Route component={Home} exact path="/" />
        <Route component={CV} exact path="/cv" />
      </Switch>
    </Router>
  );
};

export default App;
