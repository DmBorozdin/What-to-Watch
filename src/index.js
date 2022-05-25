import React from "react";
import ReactDOM from "react-dom";
import {Router} from "react-router-dom";
import {Provider} from "react-redux";
import {configureStore} from "@reduxjs/toolkit";
import App from "./components/app/app";
import rootReducer from "./store/root-reducer";
import {createApi} from "./services/api";
import {requireAuthorization} from "./store/action";
import {checkAuth} from "./store/api-actions";
import {AuthorizationStatus} from "./const";
import {redirect} from "./store/middlewares/redirect";
import browserHistory from "./browser-history";

const api = createApi(() => store.dispatch(requireAuthorization(AuthorizationStatus.NO_AUTH)));

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: api
      },
    }).concat(redirect)
});

(async () => {
  await store.dispatch(checkAuth());
  ReactDOM.render(
      <Provider store={store}>
        <Router history={browserHistory}>
          <App/>
        </Router>
      </Provider>,
      document.querySelector(`#root`)
  );
})();

