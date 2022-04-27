import MockAdapter from "axios-mock-adapter";
import {createApi} from "../../services/api";
import {user} from "./user";
import {ActionType} from "../action";
import {AuthorizationStatus} from "../../const";

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
});

describe(`Async operation should work correctly`, () => {

});
