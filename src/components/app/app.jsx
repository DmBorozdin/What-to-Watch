import React from "react";
import PropTypes from "prop-types";
import filmProp from "../../common-props/film.js";
import reviewsProp from "../../common-props/reviews.js";
import {Switch, Route, BrowserRouter} from "react-router-dom";
import Main from "../main/main";
import SignIn from "../sign-in/sign-in";
import MyList from "../my-list/my-list";
import Film from "../film/film";
import AddReview from "../add-review/add-review";
import Player from "../player/player";
import NotFoundScreen from "../not-found-screen/not-found-screen";

const App = (props) => {
  const {titleMovie, films, reviews} = props;

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <Main titleMovie={titleMovie}/>
        </Route>
        <Route exact path="/login">
          <SignIn />
        </Route>
        <Route exact path="/mylist">
          <MyList myListFilms = {films}/>
        </Route>
        <Route exact path="/films/:id">
          <Film films={films} reviews={reviews}/>
        </Route>
        <Route exact path="/films/:id/review">
          <AddReview films={films}/>
        </Route>
        <Route exact path="/player/:id">
          <Player films={films}/>
        </Route>
        <Route>
          <NotFoundScreen />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

App.propTypes = {
  titleMovie: PropTypes.shape({
    title: PropTypes.string.isRequired,
    genre: PropTypes.string.isRequired,
    year: PropTypes.string.isRequired,
  }).isRequired,
  films: PropTypes.arrayOf(filmProp).isRequired,
  reviews: reviewsProp,
};

export default App;
