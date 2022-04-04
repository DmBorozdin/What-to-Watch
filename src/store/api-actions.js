import {ActionCreator} from "./action";
import {AuthorizationStatus} from "../const";
import {APIRoute, APPRoute} from "../const";
import {adaptFilmDataToClient, adaptAuthDataToClient} from "../services/api";

export const fetchFilmList = () => (dispatch, _getState, api) => (
  api.get(APIRoute.FILMS)
    .then(({data}) => adaptFilmDataToClient(data))
    .then((adaptedData) => dispatch(ActionCreator.loadFilms(adaptedData)))
);

export const fetchFilm = (id) => (dispatch, _getState, api) => (
  api.get(`${APIRoute.FILMS}/${id}`)
    .then(({data}) => adaptFilmDataToClient([data]))
    .then((adaptedData) => dispatch(ActionCreator.loadFilm(adaptedData)))
    .catch(() => dispatch(ActionCreator.redirectToRoute(APPRoute.FILMS)))
);

export const checkAuth = () => (dispatch, _getState, api) => (
  api.get(APIRoute.LOGIN)
    .then(({data}) => adaptAuthDataToClient(data))
    .then((adaptedData) => dispatch(ActionCreator.loadAuthInfo(adaptedData)))
    .then(() => dispatch(ActionCreator.requireAuthorization(AuthorizationStatus.AUTH)))
    .catch(() => {})
);

export const login = ({login: email, password}) => (dispatch, _getState, api) =>(
  api.post(APIRoute.LOGIN, {email, password})
    .then(({data}) => adaptAuthDataToClient(data))
    .then((adaptedData) => dispatch(ActionCreator.loadAuthInfo(adaptedData)))
    .then(() => dispatch(ActionCreator.requireAuthorization(AuthorizationStatus.AUTH)))
    .then(() => dispatch(ActionCreator.redirectToRoute(APPRoute.MAIN)))
    .catch(() => {})
);

export const logout = () => (dispatch, _getState, api) => (
  api.get(APIRoute.LOGOUT)
    .then(() => dispatch(ActionCreator.requireAuthorization(AuthorizationStatus.NO_AUTH)))
    .catch(() => {})
);

export const fetchComment = (id) => (dispatch, _getState, api) => (
  api.get(`${APIRoute.COMMENTS}${id}`)
    .then(({data}) => dispatch(ActionCreator.loadReview(data)))
    .catch(() => {})
);

export const sendComment = ({rating, comment, id}) => (dispatch, _getState, api) =>(
  api.post(`${APIRoute.COMMENTS}${id}`, {rating, comment})
    // .then(() => dispatch(ActionCreator.redirectToRoute(`${APPRoute.FILMS}/${id}`)))
    .catch(() => {})
);
