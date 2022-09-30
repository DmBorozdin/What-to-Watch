export const ReviewFormType = {
  INPUT: `INPUT`,
  TEXTAREA: `TEXTAREA`,
};

export const CardVideoPlayerSize = {
  WIDTH: `280`,
  HEIGHT: `175`,
};

export const MovieNavItem = {
  OVERVIEW: `Overview`,
  DETAILS: `Details`,
  REVIEWS: `Reviews`,
};

export const Time = {
  MINUTE_IN_HOUR: 60,
  SECOND_IN_MINUTE: 60,
  SECOND_IN_HOUR: 3600,
};

export const Genre = {
  ALL_GENRE: `all genres`,
};

export const MAX_GENRE_LIST_COUNT = 10;
export const FILM_CARD_PER_STEP = 8;
export const COUNT_SIMILAR_FILM_CARD = 4;
export const FILM_START_DELAY = 1000;

export const AuthorizationStatus = {
  AUTH: `AUTH`,
  NO_AUTH: `NO_AUTH`,
};

export const APIRoute = {
  MAIN: `/`,
  FILMS: `/films`,
  LOGIN: `/login`,
  LOGOUT: `/logout`,
  COMMENTS: `/comments/`,
  PROMO: `/films/promo`,
  FAVORITE: `favorite`,
};

export const APPRoute = {
  MAIN: `/`,
  LOGIN: `/login`,
  MYLIST: `/mylist`,
  FILMS: `/films`,
  ID: `/:id`,
  REVIEW: `/review`,
  PLAYER: `/player`,
  NOTAVAILABLE: `/error`
};

export const ReviewValidation = {
  MIN_TEXT_LENGTH: 50,
  MAX_TEXT_LENGTH: 400,
};

export const ReviewFormStatus = {
  ENABLE: `ENABLE`,
  DISABLE: `DISABLE`,
};

export const ReviewFormError = {
  ERROR: `ERROR`,
  NO_ERROR: `NO_ERROR`,
};

export const AssessmentDescription = {
  BAD: `Bad`,
  NORMAL: `Normal`,
  GOOD: `Good`,
  VERY_GOOD: `Very good`,
  AWESOME: `Awesome`
};

export const HttpCode = {
  UNAUTHORIZED: 401,
  NOTFOUND: 404
};
