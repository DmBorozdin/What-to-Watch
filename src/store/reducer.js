import {ActionType} from "./action";
import films from "../mocks/films";
import {filterFilmsByGenre} from "../film";

const initialState = {
  films,
  filter: {
    genre: `all genres`,
    films
  },
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.CHANGE_GENRE:
      return {
        ...state,
        filter: {
          genre: action.payload,
          films: filterFilmsByGenre(state.films, action.payload),
        },
      };

    case ActionType.RESET_FILMS_LIST:
      return {
        ...initialState
      };
  }

  return state;
};

export {reducer};
