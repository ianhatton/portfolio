// Core
import React, { ReactElement, useEffect } from "react";

// Pages
import CV from "./pages/cv/CV";
import Home from "./pages/home/Home";

// Vendor
import { HashRouter as Router, Route, Switch, useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

const App = (): ReactElement => {
  return (
    <Router basename="/">
      <ScrollToTop />
      <Switch>
        <Route component={Home} exact path="/" />
        <Route component={CV} exact path="/cv" />
      </Switch>
    </Router>
  );
};

export default App;
