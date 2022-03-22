export const ActionType = {
  CHANGE_GENRE: `/changeGenre`,
  GET_FILMS_LIST: `/getFilmsListByType`,
  RESET_FILMS_LIST: `/reset`,
};

export const ActionCreator = {
  changeGenre: (genre) => ({
    type: ActionType.CHANGE_GENRE,
    payload: genre,
  }),
  getFilmList: (films) => ({
    type: ActionType.GET_FILMS_LIST,
    payload: films,
  }),
  resetFilmsList: () => ({
    type: ActionType.resetFilmsList,
  }),
};
