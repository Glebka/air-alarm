import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { IconContext } from "react-icons";

import "bootstrap/dist/css/bootstrap.min.css";

ReactDOM.render(
  <IconContext.Provider
    value={{ className: "global-icons" }}
  >
    <App />
  </IconContext.Provider>,
  document.getElementById("root")
);