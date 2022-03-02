import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { IconContext } from "react-icons";
import { Provider } from "react-redux";
import { store, dispatch } from "./redux/store";
import "bootstrap/dist/css/bootstrap.min.css";

const browserWindow = window as any;

browserWindow.electron.registerDispatch(dispatch);
browserWindow.dispatch = dispatch;

ReactDOM.render(
  <IconContext.Provider value={{ className: "global-icons" }}>
    <Provider store={store}>
      <App />
    </Provider>
  </IconContext.Provider>,
  document.getElementById("root")
);
