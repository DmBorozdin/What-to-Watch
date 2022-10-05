import React from "react";
import {render, screen} from "@testing-library/react";
import {Router, Switch, Route} from "react-router-dom";
import browserHistory from "../../browser-history";
import UserBlock from "./user-block";
import userEvent from "@testing-library/user-event";
import {AuthorizationStatus} from "../../const";

describe(`UserBlock should render correctly`, () => {
  beforeEach(() => {
    browserHistory.push(`/`);
  });

  it(`Should render link`, () => {
    render(
        <Router history={browserHistory}>
          <UserBlock avatarUrl={`../../../public/img/avatar.jpg`} authorizationStatus={AuthorizationStatus.NO_AUTH} onUserAvatarClick={jest.fn()}/>
        </Router>
    );
    const linkElement = screen.getByText(`Sign in`);

    expect(linkElement).toBeInTheDocument();
  });

  it(`Should render img`, () => {
    render(
        <Router history={browserHistory}>
          <UserBlock avatarUrl={`../../../public/img/avatar.jpg`} authorizationStatus={AuthorizationStatus.AUTH} onUserAvatarClick={jest.fn()}/>
        </Router>
    );

    expect(screen.getByAltText(`User avatar`)).toBeInTheDocument();
  });

  it(`When user is authorized and click by User avatar should be redirect to "my list"`, () => {
    const {container} = render(
        <Router history={browserHistory}>
          <Switch>
            <Route exact path="/">
              <UserBlock avatarUrl={`../../../public/img/avatar.jpg`} authorizationStatus={AuthorizationStatus.AUTH}/>
            </Route>
            <Route exact path="/mylist">
              <h1>My list</h1>
            </Route>
          </Switch>
        </Router>
    );

    expect(screen.getByAltText(`User avatar`)).toBeInTheDocument();
    userEvent.click(container.querySelector(`.user-block__avatar`));
    expect(screen.getByText(/My list/i)).toBeInTheDocument();
  });

  it(`When user is not authorized and click by "Sign in" should be redirect to sign in`, () => {
    render(
        <Router history={browserHistory}>
          <Switch>
            <Route exact path="/">
              <UserBlock avatarUrl={`../../../public/img/avatar.jpg`} authorizationStatus={AuthorizationStatus.NO_AUTH}/>
            </Route>
            <Route exact path="/login">
              <h1>Login page</h1>
            </Route>
          </Switch>
        </Router>
    );

    expect(screen.getByText(`Sign in`)).toBeInTheDocument();
    userEvent.click(screen.getByText(`Sign in`));
    expect(screen.getByText(`Login page`)).toBeInTheDocument();
  });
});
