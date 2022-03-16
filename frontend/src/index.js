import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";

import "../node_modules/bootstrap/dist/css/bootstrap.min.css";

import store from "./store";
import AppRoutes from "./routes";

import "./style.css"

ReactDOM.render(
    <Provider store={store}>
        <AppRoutes />
    </Provider>,
    document.getElementById("root")
);
