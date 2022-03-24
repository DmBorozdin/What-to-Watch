import {ActionType} from "./action";
import films from "../mocks/films";
import reviews from "../mocks/reviews";

const initialState = {
  films,
  reviews,
  titleMovie: {
    title: `The Grand Budapest Hotel`,
    genre: `Drama`,
    year: `2014`,
  },
  selectedGenre: `all genres`,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.CHANGE_GENRE:
      return {
        ...state,
        selectedGenre: action.payload,
      };

    case ActionType.RESET_FILMS_LIST:
      return {
        ...initialState
      };
  }

  return state;
};

export {reducer};
