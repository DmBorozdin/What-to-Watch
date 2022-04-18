import {loadFilms, loadFilm, loadPromoFilm, loadFavoriteFilms, addToFavoriteFilms, redirectToRoute, loadAuthInfo, requireAuthorization, loadReview, setReviewForm, setReviewFormError} from "./action";
import {AuthorizationStatus} from "../const";
import {APIRoute, APPRoute, ReviewFormStatus, ReviewFormError} from "../const";
import {adaptFilmDataToClient, adaptAuthDataToClient} from "../services/api";

export const fetchFilmList = () => (dispatch, _getState, api) => (
  api.get(APIRoute.FILMS)
    .then(({data}) => adaptFilmDataToClient(data))
    .then((adaptedData) => {
      dispatch(loadFilms(adaptedData));
      return adaptedData;
    })
    .then((adaptedData) => {
      if (!_getState().DATA.isFavoriteFilmsLoaded) {
        dispatch(loadFavoriteFilms(adaptedData.filter((film) => film.isFavorite)));
      }
    })
);

export const fetchFilm = (id) => (dispatch, _getState, api) => (
  api.get(`${APIRoute.FILMS}/${id}`)
    .then(({data}) => adaptFilmDataToClient([data]))
    .then((adaptedData) => dispatch(loadFilm(adaptedData)))
    .catch(() => dispatch(redirectToRoute(APPRoute.FILMS)))
);

export const fetchPromoFilm = () => (dispatch, _getState, api) => (
  api.get(APIRoute.PROMO)
    .then(({data}) => adaptFilmDataToClient([data]))
    .then((adaptedData) => dispatch(loadPromoFilm(adaptedData[0])))
);

export const fetchFavoriteFilms = () => (dispatch, _getState, api) => (
  api.get(APIRoute.FAVORITE)
    .then(({data}) => adaptFilmDataToClient(data))
    .then((adaptedData) => dispatch(loadFavoriteFilms(adaptedData)))
);

export const sendFavoriteStatus = (id, status) => (dispatch, _getState, api) =>(
  api.post(`${APIRoute.FAVORITE}/${id}/${status}`)
    .then(({data}) => adaptFilmDataToClient([data]))
    .then((adaptedData) => {
      if (adaptedData[0].isFavorite) {
        dispatch(addToFavoriteFilms(adaptedData[0]));
      } else {
        const favorite = _getState().DATA.favorite;
        const newFavorite = favorite.filter((film) => film.id !== adaptedData[0].id);
        dispatch(loadFavoriteFilms(newFavorite));
      }
      return adaptedData[0];
    })
    .then((adaptedData) => {
      const films = _getState().DATA.films;
      const newFilms = films.map((film) => film.id === adaptedData.id ? adaptedData : film);
      dispatch(_getState().DATA.isDataLoaded ? loadFilms(newFilms) : loadFilm(newFilms));
    })
);

export const checkAuth = () => (dispatch, _getState, api) => (
  api.get(APIRoute.LOGIN)
    .then(({data}) => adaptAuthDataToClient(data))
    .then((adaptedData) => dispatch(loadAuthInfo(adaptedData)))
    .then(() => dispatch(requireAuthorization(AuthorizationStatus.AUTH)))
    .catch(() => {})
);

export const login = ({login: email, password}) => (dispatch, _getState, api) =>(
  api.post(APIRoute.LOGIN, {email, password})
    .then(({data}) => adaptAuthDataToClient(data))
    .then((adaptedData) => dispatch(loadAuthInfo(adaptedData)))
    .then(() => dispatch(requireAuthorization(AuthorizationStatus.AUTH)))
    .then(() => dispatch(redirectToRoute(APPRoute.MAIN)))
    .catch(() => {})
);

export const logout = () => (dispatch, _getState, api) => (
  api.get(APIRoute.LOGOUT)
    .then(() => dispatch(requireAuthorization(AuthorizationStatus.NO_AUTH)))
    .catch(() => {})
);

export const fetchComment = (id) => (dispatch, _getState, api) => (
  api.get(`${APIRoute.COMMENTS}${id}`)
    .then(({data}) => dispatch(loadReview(data)))
    .catch(() => {})
);

export const sendComment = ({rating, comment, id}) => (dispatch, _getState, api) =>(
  api.post(`${APIRoute.COMMENTS}${id}`, {rating, comment})
    .then(() => dispatch(redirectToRoute(`${APPRoute.FILMS}/${id}`)))
    .then(() => dispatch(setReviewForm(ReviewFormStatus.ENABLE)))
    .catch(() => {
      dispatch(setReviewFormError(ReviewFormError.ERROR));
      dispatch(setReviewForm(ReviewFormStatus.ENABLE));
    })
);
