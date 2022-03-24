export const ActionType = {
  CHANGE_GENRE: `genreList/changeGenre`,
  RESET_FILMS_LIST: `main/reset`,
};

export const ActionCreator = {
  changeGenre: (genre) => ({
    type: ActionType.CHANGE_GENRE,
    payload: genre,
  }),
  resetFilmsList: () => ({
    type: ActionType.RESET_FILMS_LIST,
  }),
};
