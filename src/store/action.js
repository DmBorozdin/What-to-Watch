export const ActionType = {
  CHANGE_GENRE: `filmsList/changeGenre`,
  RESET_FILMS_LIST: `filmsList/reset`,
  LOAD_FILMS: `data/loadFilms`,
  LOAD_FILM: `data/loadFilm`,
  LOAD_AUTH_INFO: `data/loadAuthInfo`,
  LOAD_REVIEW: `data/loadReview`,
  RESET_REVIEW: `data/resetReview`,
  REQUIRED_AUTHORIZATION: `user/requiredAuthorization`,
  REDIRECT_TO_ROUTE: `route/redirectToRoute`,
  SET_REVIEW_FORM: `review/setReviewForm`,
  SET_REVIEW_FORM_ERR: `review/setReviewFormError`,
};

export const changeGenre = (genre) => ({
  type: ActionType.CHANGE_GENRE,
  payload: genre,
});

export const resetFilmsList = () => ({
  type: ActionType.RESET_FILMS_LIST,
});

export const loadFilms = (films) => ({
  type: ActionType.LOAD_FILMS,
  payload: films,
});

export const loadFilm = (film) => ({
  type: ActionType.LOAD_FILM,
  payload: film,
});

export const requireAuthorization = (status) => ({
  type: ActionType.REQUIRED_AUTHORIZATION,
  payload: status,
});

export const redirectToRoute = (url) => ({
  type: ActionType.REDIRECT_TO_ROUTE,
  payload: url,
});

export const loadAuthInfo = (authInfo) => ({
  type: ActionType.LOAD_AUTH_INFO,
  payload: authInfo,
});

export const loadReview = (reviews) =>({
  type: ActionType.LOAD_REVIEW,
  payload: reviews,
});

export const resetReview = () =>({
  type: ActionType.RESET_REVIEW,
});

export const setReviewForm = (statusForm) =>({
  type: ActionType.SET_REVIEW_FORM,
  payload: statusForm,
});

export const setReviewFormError = (error) => ({
  type: ActionType.SET_REVIEW_FORM_ERR,
  payload: error,
});
