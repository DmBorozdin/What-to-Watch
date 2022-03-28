import {ActionType} from "./action";
import reviews from "../mocks/reviews";
import {AuthorizationStatus, Genre} from "../const";

const initialState = {
  films: [],
  reviews,
  titleMovie: {
    title: `The Grand Budapest Hotel`,
    genre: `Drama`,
    year: `2014`,
  },
  selectedGenre: Genre.ALL_GENRE,
  authorizationStatus: AuthorizationStatus.NO_AUTH,
  isDataLoaded: false,
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
        ...state,
        selectedGenre: Genre.ALL_GENRE,
      };

    case ActionType.LOAD_FILMS:
      return {
        ...state,
        films: action.payload,
        isDataLoaded: true,
      };

    case ActionType.REQUIRED_AUTHORIZATION:
      return {
        ...state,
        authorizationStatus: action.payload,
      };
  }

  return state;
};

export {reducer};
