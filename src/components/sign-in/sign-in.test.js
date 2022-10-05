import React from "react";
import {render, screen} from "@testing-library/react";
import {Router, Switch, Route} from "react-router-dom";
import {createMemoryHistory} from "history";
import configureStore from "redux-mock-store";
import {Provider} from "react-redux";
import userEvent from "@testing-library/user-event";
import SignIn from "./sign-in";

const mockStore = configureStore({});
let history;

jest.mock(`../../store/api-actions`, () => ({
  __esModule: true,
  ...jest.requireActual(`../../store/api-actions`),
  login: jest.fn(() => `login`),
}));

describe(`Sign in test`, () => {
  beforeEach(() => {
    history = createMemoryHistory();
    history.push(`/login`);
  });

  it(`Render 'SignIn' when user navigate to '/login' url`, () => {
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

  it(`When user click on the Logo, it should be redirected to the main screen`, () => {
    const {container} = render(
        <Provider store={mockStore({})}>
          <Router history={history}>
            <Switch>
              <Route exact path="/login">
                <SignIn />
              </Route>
              <Route exact path="/">
                <h1>Main screen</h1>
              </Route>
            </Switch>
          </Router>
        </Provider>
    );

    screen.getAllByText(/Sign in/i).forEach((element) => expect(element).toBeInTheDocument());
    container.querySelectorAll(`.logo__link`).forEach((logo) => {
      userEvent.click(logo);
      expect(screen.getByText(/Main screen/i)).toBeInTheDocument();
    });
  });
});
