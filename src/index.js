import React from "react";
import ReactDOM from "react-dom";
import App from "./components/app/app";
import films from "./mocks/films";

const TitleMovie = {
  title: `The Grand Budapest Hotel`,
  genre: `Drama`,
  year: `2014`,
};

ReactDOM.render(
    <App
      titleMovie={TitleMovie}
      films = {films}
    />,
    document.querySelector(`#root`)
);
