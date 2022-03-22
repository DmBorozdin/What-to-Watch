import React from "react";
import ReactDOM from "react-dom";
import {createStore} from "redux";
import {Provider} from "react-redux";
import {composeWithDevTools} from "redux-devtools-extension";
import App from "./components/app/app";
import films from "./mocks/films";
import reviews from "./mocks/reviews";
import {reducer} from "./store/reducer";

const TitleMovie = {
  title: `The Grand Budapest Hotel`,
  genre: `Drama`,
  year: `2014`,
};

const store = createStore(reducer, composeWithDevTools());

ReactDOM.render(
    <Provider store={store}>
      <App
        titleMovie={TitleMovie}
        films = {films}
        reviews = {reviews}
      />
    </Provider>,
    document.querySelector(`#root`)
);
