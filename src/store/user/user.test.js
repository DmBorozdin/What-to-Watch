import MockAdapter from "axios-mock-adapter";
import {createApi} from "../../services/api";
import {user} from "./user";
import {ActionType} from "../action";
import {checkAuth, login, logout} from "../api-actions";
import {AuthorizationStatus, APIRoute, APPRoute} from "../../const";

const api = createApi(() => {});

describe(`Reducer 'user' should work correctly`, () => {
  it(`Reducer without additional parameters should return initial state`, () => {
    expect(user(undefined, {})).toEqual({authorizationStatus: AuthorizationStatus.NO_AUTH});
  });

  it(`Reducer should update authorizationStatus to 'auth'`, () => {
    const state = {authorizationStatus: AuthorizationStatus.NO_AUTH};
    const requiredAuthorizationAction = {
      type: ActionType.REQUIRED_AUTHORIZATION,
      payload: AuthorizationStatus.AUTH
    };

    expect(user(state, requiredAuthorizationAction)).toEqual({authorizationStatus: AuthorizationStatus.AUTH});
  });

  it(`Reducer should update authorizationStatus to 'no auth'`, () => {
    const state = {authorizationStatus: AuthorizationStatus.AUTH};
    const requiredAuthorizationAction = {
      type: ActionType.REQUIRED_AUTHORIZATION,
      payload: AuthorizationStatus.NO_AUTH
    };

    expect(user(state, requiredAuthorizationAction)).toEqual({authorizationStatus: AuthorizationStatus.NO_AUTH});
  });
});

describe(`Async operation should work correctly`, () => {
  it(`Should make a correct check Authorization`, () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const checkAuthLoader = checkAuth();
    const fakeResponse = {
      "avatar_url": `https://assets.htmlacademy.ru/intensives/javascript-3/avatar/2.jpg`,
      "email": `keks@mail.ru`,
      "id": 1,
      "name": `keks`
    };

    apiMock
      .onGet(APIRoute.LOGIN)
      .reply(200, fakeResponse);

    return checkAuthLoader(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(2);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.LOAD_AUTH_INFO,
          payload: {
            "avatarUrl": `https://assets.htmlacademy.ru/intensives/javascript-3/avatar/2.jpg`,
            "email": `keks@mail.ru`,
            "id": 1,
            "name": `keks`
          },
        });
        expect(dispatch).toHaveBeenNthCalledWith(2, {
          type: ActionType.REQUIRED_AUTHORIZATION,
          payload: AuthorizationStatus.AUTH,
        });
      });
  });

  it(`Should make a correct API call to /login`, () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const fakeUser = {email: `keks@mail.ru`, password: `123`};
    const loginLoader = login(fakeUser);
    const fakeResponse = {
      "avatar_url": `https://assets.htmlacademy.ru/intensives/javascript-3/avatar/2.jpg`,
      "email": `keks@mail.ru`,
      "id": 1,
      "name": `keks`
    };

    apiMock
      .onPost(APIRoute.LOGIN)
      .reply(200, fakeResponse);

    return loginLoader(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(3);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.LOAD_AUTH_INFO,
          payload: {
            "avatarUrl": `https://assets.htmlacademy.ru/intensives/javascript-3/avatar/2.jpg`,
            "email": `keks@mail.ru`,
            "id": 1,
            "name": `keks`
          },
        });

        expect(dispatch).toHaveBeenNthCalledWith(2, {
          type: ActionType.REQUIRED_AUTHORIZATION,
          payload: AuthorizationStatus.AUTH,
        });

        expect(dispatch).toHaveBeenNthCalledWith(3, {
          type: ActionType.REDIRECT_TO_ROUTE,
          payload: APPRoute.MAIN,
        });
      });
  });

  it(`Should make a correct API call to /logout`, () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const logoutLoader = logout();

    apiMock
      .onGet(APIRoute.LOGOUT)
      .reply(200);

    return logoutLoader(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);

        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.REQUIRED_AUTHORIZATION,
          payload: AuthorizationStatus.NO_AUTH,
        });
      });
  });
});
