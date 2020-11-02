// Core
import React from "react";

// Stylesheets
import "./assets/stylesheets/index.scss";

// Components
import App from "./App";

// Vendor
import ReactDOM from "react-dom";

// Other
import * as serviceWorker from "./serviceWorker";

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
