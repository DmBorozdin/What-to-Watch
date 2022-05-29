import {redirect} from "./redirect";
import {redirectToRoute} from "../action";
import {APPRoute} from "../../const";

const mockRedux = () => {
  const store = {
    getState: jest.fn(() => ({})),
    dispatch: jest.fn(),
  };

  const next = jest.fn();
  const invoke = (action) => redirect(store)(next)(action);
  return {store, next, invoke};
};

const fakeHistory = {
  location: {pathname: ``},
  push(path) {
    this.location.pathname = path;
  }
};

jest.mock(`../../browser-history`, () => fakeHistory);

describe(`redirect middleware should works correctly`, () => {
  it(`Action passes to next middleware`, () => {
    const {invoke, next} = mockRedux();
    const action = redirectToRoute(`/`);
    invoke(action);
    expect(next).toBeCalledWith(action);
  });

  it(`Redirect route should be added to fakeHistory`, () => {
    const {invoke} = mockRedux();
    invoke(redirectToRoute(APPRoute.LOGIN));
    expect(fakeHistory.location.pathname).toBe(APPRoute.LOGIN);

    invoke(redirectToRoute(`/lose`));
    expect(fakeHistory.location.pathname).toBe(`/lose`);
  });

  it(`Non redirect because bad action`, () => {
    const url = `/test-url`;
    const {invoke} = mockRedux();
    invoke({type: `TEST_ACTION`, payload: url});
    expect(fakeHistory.location.pathname).not.toBe(url);
  });
});
