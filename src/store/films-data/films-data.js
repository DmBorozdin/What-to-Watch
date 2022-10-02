import {createReducer} from "@reduxjs/toolkit";
import {loadFilms, loadFilm, loadPromoFilm, loadFavoriteFilms, resetFavoriteList, loadAuthInfo, loadReview, resetReview} from "../action";

const initialState = {
  films: [],
  reviews: [],
  promoFilm: {},
  favorite: [],
  authInfo: {
    id: -1,
    email: ``,
    name: ``,
    avatarUrl: ``,
  },
  isDataLoaded: false,
  isOneFilmLoaded: false,
  isPromoFilmLoaded: false,
  isFavoriteFilmsLoaded: false,
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
  builder.addCase(loadPromoFilm, (state, action) => {
    state.promoFilm = action.payload;
    state.isPromoFilmLoaded = true;
  });
  builder.addCase(loadFavoriteFilms, (state, action) => {
    state.favorite = action.payload;
    state.isFavoriteFilmsLoaded = true;
  });
  builder.addCase(resetFavoriteList, (state) => {
    state.isFavoriteFilmsLoaded = initialState.isFavoriteFilmsLoaded;
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
