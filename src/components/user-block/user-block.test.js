import React from "react";
import {render, screen} from "@testing-library/react";
import {Router} from "react-router-dom";
import {createMemoryHistory} from "history";
import UserBlock from "./user-block";
import userEvent from "@testing-library/user-event";
import {AuthorizationStatus} from "../../const";

let history;

describe(`UserBlock should render correctly`, () => {
  beforeEach(() => {
    history = createMemoryHistory();
  });

  it(`Should render link`, () => {
    render(
        <Router history={history}>
          <UserBlock avatarUrl={`../../../public/img/avatar.jpg`} authorizationStatus={AuthorizationStatus.NO_AUTH} onUserAvatarClick={jest.fn()}/>
        </Router>
    );
    const linkElement = screen.getByText(`Sign in`);

    expect(linkElement).toBeInTheDocument();
  });

  it(`Should render img`, () => {
    render(
        <Router history={history}>
          <UserBlock avatarUrl={`../../../public/img/avatar.jpg`} authorizationStatus={AuthorizationStatus.AUTH} onUserAvatarClick={jest.fn()}/>
        </Router>
    );

    expect(screen.getByAltText(`User avatar`)).toBeInTheDocument();
  });

  it(`UserBlock should cal 'onUserAvatarClick' function when mouse click the avatar`, () => {
    const handleUserAvatarClick = jest.fn();
    const {container} = render(
        <Router history={history}>
          <UserBlock avatarUrl={`../../../public/img/avatar.jpg`} authorizationStatus={AuthorizationStatus.AUTH} onUserAvatarClick={handleUserAvatarClick}/>
        </Router>
    );

    expect(screen.getByAltText(`User avatar`)).toBeInTheDocument();
    userEvent.click(container.querySelector(`.user-block__avatar`));
    expect(handleUserAvatarClick).toBeCalled();
  });
});
