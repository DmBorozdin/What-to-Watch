import axios from "axios";

const BACKEND_URL = `https://6.react.pages.academy/wtw`;
const REQUIST_TIMEOUT = 5000;

const HttpCode = {
  UNAUTHORIZED: 401
};

export const createApi = (onUnauthorized) => {
  const api = axios.create({
    baseURL: BACKEND_URL,
    timeout: REQUIST_TIMEOUT,
    withCredentials: true,
  });

  const onSuccess = (responce) => responce;

  const onFail = (err) => {
    const {responce} = err;

    if (responce.status === HttpCode.UNAUTHORIZED) {
      onUnauthorized();

      throw err;
    }

    throw err;
  };

  api.interceptors.response.use(onSuccess, onFail);

  return api;
};

export const adaptFilmDataToClient = (filmList) => {
  return filmList.map((film) => {
    const adaptedFilm = Object.assign(
        {},
        film,
        {
          posterImage: film.poster_image,
          previewImage: film.preview_image,
          backgroundImage: film.background_image,
          backgroundColor: film.background_color,
          videoLink: film.video_link,
          previewVideoLink: film.preview_video_link,
          scoresCount: film.scores_count,
          runTime: film.run_time,
          isFavorite: film.is_favorite,
        }
    );

    delete adaptedFilm.poster_image;
    delete adaptedFilm.preview_image;
    delete adaptedFilm.background_image;
    delete adaptedFilm.background_color;
    delete adaptedFilm.video_link;
    delete adaptedFilm.preview_video_link;
    delete adaptedFilm.scores_count;
    delete adaptedFilm.run_time;
    delete adaptedFilm.is_favorite;

    return adaptedFilm;
  });
};

export const adaptAuthDataToClient = (authInfo) => {
  const adaptedAuthInfo = Object.assign(
      {},
      authInfo,
      {
        avatarUrl: authInfo.avatar_url,
      }
  );

  delete adaptedAuthInfo.avatar_url;

  return adaptedAuthInfo;
};
