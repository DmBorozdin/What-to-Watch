import {createAction} from "@reduxjs/toolkit";

export const ActionType = {
  CHANGE_GENRE: `filmsList/changeGenre`,
  RESET_FILMS_LIST: `filmsList/reset`,
  LOAD_FILMS: `data/loadFilms`,
  LOAD_FILM: `data/loadFilm`,
  LOAD_PROMO_FILM: `data/loadPromoFilm`,
  LOAD_FAVORITE_FILMS: `data/loadFavoriteFilms`,
  RESET_FAVORITE_LIST: `data/resetFavoriteList`,
  LOAD_AUTH_INFO: `data/loadAuthInfo`,
  LOAD_REVIEW: `data/loadReview`,
  RESET_REVIEW: `data/resetReview`,
  REQUIRED_AUTHORIZATION: `user/requiredAuthorization`,
  REDIRECT_TO_ROUTE: `route/redirectToRoute`,
  SET_REVIEW_FORM: `review/setReviewForm`,
  SET_REVIEW_FORM_ERR: `review/setReviewFormError`,
};

export const changeGenre = createAction(ActionType.CHANGE_GENRE, (genre) => ({payload: genre}));

export const resetFilmsList = createAction(ActionType.RESET_FILMS_LIST);

export const loadFilms = createAction(ActionType.LOAD_FILMS, (films) => ({payload: films}));

export const loadFilm = createAction(ActionType.LOAD_FILM, (film) => ({payload: film}));

export const loadPromoFilm = createAction(ActionType.LOAD_PROMO_FILM, (film) => ({payload: film}));

export const loadFavoriteFilms = createAction(ActionType.LOAD_FAVORITE_FILMS, (films) => ({payload: films}));

export const resetFavoriteList = createAction(ActionType.RESET_FAVORITE_LIST);

export const requireAuthorization = createAction(ActionType.REQUIRED_AUTHORIZATION, (status) => ({payload: status}));

export const redirectToRoute = createAction(ActionType.REDIRECT_TO_ROUTE, (url) => ({payload: url}));

export const loadAuthInfo = createAction(ActionType.LOAD_AUTH_INFO, (authInfo) => ({payload: authInfo}));

export const loadReview = createAction(ActionType.LOAD_REVIEW, (reviews) =>({payload: reviews}));

export const resetReview = createAction(ActionType.RESET_REVIEW);

export const setReviewForm = createAction(ActionType.SET_REVIEW_FORM, (statusForm) =>({payload: statusForm}));

export const setReviewFormError = createAction(ActionType.SET_REVIEW_FORM_ERR, (error) => ({payload: error}));
