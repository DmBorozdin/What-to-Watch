import React from "react";
import ReactDOM from "react-dom";
import App from "./components/app/app";

const MoviesList = [];

ReactDOM.render(
    <App moviesList = {MoviesList} />,
    document.querySelector(`#root`)
);
