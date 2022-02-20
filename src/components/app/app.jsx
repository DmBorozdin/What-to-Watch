import React from "react";
import PropTypes from "prop-types";
import {Switch, Route, BrowserRouter} from "react-router-dom";
import Main from "../main/main";
import SignIn from "../sign-in/sign-in";
import MyList from "../my-list/my-list";
import Film from "../film/film";
import AddReview from "../add-review/add-review";
import Player from "../player/player";
import NotFoundScreen from "../not-found-screen/not-found-screen";

const App = (props) => {
  const {titleMovie, films} = props;

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <Main titleMovie={titleMovie} films={films}/>
        </Route>
        <Route exact path="/login">
          <SignIn />
        </Route>
        <Route exact path="/mylist">
          <MyList myListFilms = {films}/>
        </Route>
        <Route exact path="/films/:id">
          <Film films={films}/>
        </Route>
        <Route exact path="/films/:id/review">
          <AddReview films={films}/>
        </Route>
        <Route exact path="/player/:id">
          <Player />
        </Route>
        <Route>
          <NotFoundScreen />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

App.propTypes = {
  titleMovie: PropTypes.object.isRequired,
  films: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
};

export default App;
