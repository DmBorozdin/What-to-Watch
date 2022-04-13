import {loadFilms, loadFilm, redirectToRoute, loadAuthInfo, requireAuthorization, loadReview, setReviewForm, setReviewFormError} from "./action";
import {AuthorizationStatus} from "../const";
import {APIRoute, APPRoute, ReviewFormStatus, ReviewFormError} from "../const";
import {adaptFilmDataToClient, adaptAuthDataToClient} from "../services/api";

export const fetchFilmList = () => (dispatch, _getState, api) => (
  api.get(APIRoute.FILMS)
    .then(({data}) => adaptFilmDataToClient(data))
    .then((adaptedData) => dispatch(loadFilms(adaptedData)))
);

export const fetchFilm = (id) => (dispatch, _getState, api) => (
  api.get(`${APIRoute.FILMS}/${id}`)
    .then(({data}) => adaptFilmDataToClient([data]))
    .then((adaptedData) => dispatch(loadFilm(adaptedData)))
    .catch(() => dispatch(redirectToRoute(APPRoute.FILMS)))
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
