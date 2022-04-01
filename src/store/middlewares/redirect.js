import browserHistory from "../../browser-history";
import {ActionType} from "../action";

export const redirect = (_store) => (next) => (action) => {
  if (ActionType.REDIRECT_TO_ROUTE === action.type) {
    browserHistory.push(action.payload);
  }

  return next(action);
};
