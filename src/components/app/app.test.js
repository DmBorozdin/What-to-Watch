import React from "react";
import {render, screen} from "@testing-library/react";
import {Router} from "react-router-dom";
import {createMemoryHistory} from "history";
import configureStore from "redux-mock-store";
import * as redux from "react-redux";
import {Provider} from "react-redux";
import App from "./app";

const mockStore = configureStore({});

describe(`Test routing`, () => {
  jest.spyOn(redux, `useSelector`);
  jest.spyOn(redux, `useDispatch`);

  it(`Render 'Main' when user navigate to '/' url`, () => {
    const history = createMemoryHistory();

    render(
        <Provider store={mockStore({})}>
          <Router history={history}>
            <App />
          </Router>
        </Provider>
    );
  });
});

