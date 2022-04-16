import {createReducer} from "@reduxjs/toolkit";
import {loadFilms, loadFilm, loadAuthInfo, loadReview, resetReview} from "../action";

const initialState = {
  films: [],
  reviews: [],
  titleMovie: {
    title: `The Grand Budapest Hotel`,
    genre: `Drama`,
    year: `2014`,
  },
  authInfo: {
    id: -1,
    email: ``,
    name: ``,
    avatarUrl: ``,
  },
  isDataLoaded: false,
  isOneFilmLoaded: false,
  isReviewLoaded: false,
};

const filmsData = createReducer(initialState, (builder) => {
  builder.addCase(loadFilms, (state, action) => {
    state.films = action.payload;
    state.isDataLoaded = true;
    state.isOneFilmLoaded = true;
  });
  builder.addCase(loadFilm, (state, action) => {
    state.films = action.payload;
    state.isOneFilmLoaded = true;
  });
  builder.addCase(loadAuthInfo, (state, action) => {
    state.authInfo = action.payload;
  });
  builder.addCase(loadReview, (state, action) => {
    state.reviews = action.payload;
    state.isReviewLoaded = true;
  });
  builder.addCase(resetReview, (state) => {
    state.isReviewLoaded = initialState.isReviewLoaded;
  });
});

export {filmsData};
