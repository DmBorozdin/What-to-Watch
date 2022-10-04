import React from "react";
import {render, screen} from "@testing-library/react";
import {Router, Switch, Route} from "react-router-dom";
import Logo from "./logo";
import {createMemoryHistory} from "history";
import userEvent from "@testing-library/user-event";

let history;

describe(`Logo test`, () => {
  beforeEach(() => {
    history = createMemoryHistory();
  });
  it(`Logo should render correctly`, () => {
    render(
        <Router history={history}>
          <Logo/>
        </Router>
    );

    expect(screen.getAllByText(`W`)).toHaveLength(2);
    expect(screen.getByText(`T`)).toBeInTheDocument();
  });

  it(`When user click by "Logo WTW" should be redirect to main page`, () => {
    history.push(`/films/1`);
    const {container} = render(
        <Router history={history}>
          <Switch>
            <Route exact path="/films/1">
              <Logo/>
            </Route>
            <Route exact path="/">
              <h1>Main page</h1>
            </Route>
          </Switch>
        </Router>
    );

    expect(screen.getAllByText(`W`)).toHaveLength(2);
    expect(screen.getByText(`T`)).toBeInTheDocument();
    userEvent.click(container.querySelector(`.logo__link`));
    expect(screen.getByText(`Main page`)).toBeInTheDocument();
  });
});
