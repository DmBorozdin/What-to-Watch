import React from "react";
import {render, screen} from "@testing-library/react";
import {Router} from "react-router-dom";
import {createMemoryHistory} from "history";
import configureStore from "redux-mock-store";
import {Provider} from "react-redux";
import userEvent from "@testing-library/user-event";
import SignIn from "./sign-in";

const mockStore = configureStore({});

it(`Render 'SignIn' when user navigate to '/login' url`, () => {
  const history = createMemoryHistory();

  render(
      <Provider store={mockStore({})}>
        <Router history={history}>
          <SignIn/>
        </Router>
      </Provider>
  );

  screen.getAllByText(/Sign in/i).forEach((element) => expect(element).toBeInTheDocument());

  expect(screen.getByLabelText(/Email address/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();

  userEvent.type(screen.getByTestId(`login`), `user`);
  userEvent.type(screen.getByTestId(`password`), `123`);

  expect(screen.getByDisplayValue(/user/i)).toBeInTheDocument();
  expect(screen.getByDisplayValue(/123/i)).toBeInTheDocument();
});
