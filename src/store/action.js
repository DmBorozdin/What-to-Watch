export const ActionType = {
  CHANGE_GENRE: `genreList/changeGenre`,
  RESET_FILMS_LIST: `main/reset`,
  LOAD_FILMS: `data/loadFilms`,
  LOAD_FILM: `data/loadFilm`,
  REQUIRED_AUTHORIZATION: `user/requiredAuthorization`,
  REDIRECT_TO_ROUTE: `main/redirectToRoute`,
  LOAD_AUTH_INFO: `data/loadAuthInfo`,
};

export const ActionCreator = {
  changeGenre: (genre) => ({
    type: ActionType.CHANGE_GENRE,
    payload: genre,
  }),
  resetFilmsList: () => ({
    type: ActionType.RESET_FILMS_LIST,
  }),
  loadFilms: (films) => ({
    type: ActionType.LOAD_FILMS,
    payload: films,
  }),
  loadFilm: (film) => ({
    type: ActionType.LOAD_FILM,
    payload: film,
  }),
  requireAuthorization: (status) => ({
    type: ActionType.REQUIRED_AUTHORIZATION,
    payload: status,
  }),
  redirectToRoute: (url) => ({
    type: ActionType.REDIRECT_TO_ROUTE,
    payload: url,
  }),
  loadAuthInfo: (authInfo) => ({
    type: ActionType.LOAD_AUTH_INFO,
    payload: authInfo,
  }),
};
