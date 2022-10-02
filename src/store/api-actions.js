import {loadFilms, loadFilm, loadPromoFilm, loadFavoriteFilms, resetFavoriteList, redirectToRoute, loadAuthInfo, requireAuthorization, loadReview, setReviewForm, setReviewFormError} from "./action";
import {AuthorizationStatus} from "../const";
import {APIRoute, APPRoute, ReviewFormStatus, ReviewFormError, HttpCode} from "../const";
import {adaptFilmDataToClient, adaptAuthDataToClient} from "../services/api";

export const fetchFilmList = () => (dispatch, _getState, api) => (
  api.get(APIRoute.FILMS)
    .then(({data}) => adaptFilmDataToClient(data))
    .then((adaptedData) => {
      dispatch(loadFilms(adaptedData));
      return adaptedData;
    })
    .catch(() => dispatch(redirectToRoute(APPRoute.NOTAVAILABLE)))
);

export const fetchFilm = (id) => (dispatch, _getState, api) => (
  api.get(`${APIRoute.FILMS}/${id}`)
    .then(({data}) => adaptFilmDataToClient([data]))
    .then((adaptedData) => dispatch(loadFilm(adaptedData)))
    .catch((err) => {
      if (err.response && err.response.status === HttpCode.NOTFOUND) {
        dispatch(redirectToRoute(APPRoute.FILMS));
      } else {
        dispatch(redirectToRoute(APPRoute.NOTAVAILABLE));
      }
    })
);

export const fetchPromoFilm = () => (dispatch, _getState, api) => (
  api.get(APIRoute.PROMO)
    .then(({data}) => adaptFilmDataToClient([data]))
    .then((adaptedData) => dispatch(loadPromoFilm(adaptedData[0])))
    .catch(() => dispatch(redirectToRoute(APPRoute.NOTAVAILABLE)))
);

export const fetchFavoriteFilms = () => (dispatch, _getState, api) => (
  api.get(APIRoute.FAVORITE)
    .then(({data}) => adaptFilmDataToClient(data))
    .then((adaptedData) => dispatch(loadFavoriteFilms(adaptedData)))
);

export const sendFavoriteStatus = (id, status) => (dispatch, _getState, api) =>(
  api.post(`${APIRoute.FAVORITE}/${id}/${status}`)
    .then(({data}) => adaptFilmDataToClient([data])[0])
    .then((adaptedData) => {
      const films = _getState().DATA.films;
      const newFilms = films.map((film) => film.id === adaptedData.id ? adaptedData : film);
      dispatch(loadFilms(newFilms));
      if (_getState().DATA.isPromoFilmLoaded && adaptedData.id === _getState().DATA.promoFilm.id) {
        dispatch(loadPromoFilm(adaptedData));
      }
    })
    .then(() => _getState().DATA.isFavoriteFilmsLoaded && dispatch(resetFavoriteList()))
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
