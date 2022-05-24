import React from "react";
import {render, screen} from "@testing-library/react";
import {Router} from "react-router-dom";
import {createMemoryHistory} from "history";
import UserBlock from "./user-block";
import {AuthorizationStatus} from "../../const";


describe(`UserBlock should render correctly`, () => {
  it(`Should render link`, () => {
    const history = createMemoryHistory();
    render(
        <Router history={history}>
          <UserBlock avatarUrl={`../../../public/img/avatar.jpg`} authorizationStatus={AuthorizationStatus.NO_AUTH} onUserAvatarClick={jest.fn()}/>
        </Router>
    );
    const linkElement = screen.getByText(`Sign in`);

    expect(linkElement).toBeInTheDocument();
  });

  it(`Should render img`, () => {
    const history = createMemoryHistory();
    render(
        <Router history={history}>
          <UserBlock avatarUrl={`../../../public/img/avatar.jpg`} authorizationStatus={AuthorizationStatus.AUTH} onUserAvatarClick={jest.fn()}/>
        </Router>
    );
    const imgElement = screen.getByAltText(`User avatar`);

    expect(imgElement).toBeInTheDocument();
  });
});
