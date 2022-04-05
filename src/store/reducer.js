import {ActionType} from "./action";
import {AuthorizationStatus, Genre, ReviewFormStatus, ReviewFormError} from "../const";

const initialState = {
  films: [],
  reviews: [],
  titleMovie: {
    title: `The Grand Budapest Hotel`,
    genre: `Drama`,
    year: `2014`,
  },
  authInfo: {
    id: -1,
    email: ``,
    name: ``,
    avatarUrl: ``,
  },
  selectedGenre: Genre.ALL_GENRE,
  authorizationStatus: AuthorizationStatus.NO_AUTH,
  isDataLoaded: false,
  isOneFilmLoaded: false,
  isReviewLoaded: false,
  reviewFormStatus: ReviewFormStatus.ENABLE,
  isReviewFormSubmError: ReviewFormError.NO_ERROR,
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
        isOneFilmLoaded: true,
      };

    case ActionType.LOAD_FILM:
      return {
        ...state,
        films: action.payload,
        isOneFilmLoaded: true,
      };

    case ActionType.REQUIRED_AUTHORIZATION:
      return {
        ...state,
        authorizationStatus: action.payload,
      };

    case ActionType.LOAD_AUTH_INFO:
      return {
        ...state,
        authInfo: action.payload,
      };

    case ActionType.LOAD_REVIEW:
      return {
        ...state,
        reviews: action.payload,
        isReviewLoaded: true,
      };

    case ActionType.RESET_REVIEW:
      return {
        ...state,
        isReviewLoaded: initialState.isReviewLoaded,
      };

    case ActionType.SET_REVIEW_FORM:
      return {
        ...state,
        reviewFormStatus: action.payload,
      };
    case ActionType.SET_REVIEW_FORM_ERR:
      return {
        ...state,
        isReviewFormSubmError: action.payload,
      };
  }

  return state;
};

export {reducer};
