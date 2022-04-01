import React from "react";
import {Switch, Route, Router} from "react-router-dom";
import Main from "../main/main";
import SignIn from "../sign-in/sign-in";
import MyList from "../my-list/my-list";
import Film from "../film/film";
import AddReview from "../add-review/add-review";
import Player from "../player/player";
import NotFoundScreen from "../not-found-screen/not-found-screen";
import PrivateRoute from "../private-route/private-route";
import browserHistory from "../../browser-history";
import {APPRoute} from "../../const";

const App = () => {
  return (
    <Router history={browserHistory}>
      <Switch>
        <Route exact path={APPRoute.MAIN}>
          <Main/>
        </Route>
        <Route exact path="/login">
          <SignIn />
        </Route>
        <PrivateRoute exact path={APPRoute.MYLIST} render={() => <MyList/>}/>
        <Route exact path={APPRoute.FILMS + APPRoute.ID}>
          <Film/>
        </Route>
        <PrivateRoute exact path={APPRoute.FILMS + APPRoute.ID + APPRoute.REVIEW} render={() => <AddReview/>}/>
        <Route exact path={APPRoute.PLAYER + APPRoute.ID}>
          <Player/>
        </Route>
        <Route>
          <NotFoundScreen />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
