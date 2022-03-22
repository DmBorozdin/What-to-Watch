import {ActionType} from "./action";
import films from "../mocks/films";

const initialState = {
  films,
  filter: {
    genre: `all`,
    films
  },
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.CHANGE_GENRE:
      return {
        ...state,
        genre: action.payload,
      };

    case ActionType.GET_FILMS_LIST:
      return {
        ...state,
        films: action.payload,
      };

    case ActionType.RESET_FILMS_LIST:
      return {
        ...initialState
      };
  }

  return state;
};

export {reducer};
