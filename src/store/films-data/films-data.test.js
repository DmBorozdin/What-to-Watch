import MockAdapter from "axios-mock-adapter";
import {createApi} from "../../services/api";
import {filmsData} from "./films-data";
import {ActionType} from "../action";
import {fetchFilmList, fetchFilm, fetchPromoFilm, fetchFavoriteFilms} from "../api-actions";
import {APIRoute, APPRoute} from "../../const";

const api = createApi(() => {});
const initialState = {
  films: [],
  reviews: [],
  promoFilm: {},
  favorite: [],
  authInfo: {
    id: -1,
    email: ``,
    name: ``,
    avatarUrl: ``,
  },
  isDataLoaded: false,
  isOneFilmLoaded: false,
  isPromoFilmLoaded: false,
  isFavoriteFilmsLoaded: false,
  isReviewLoaded: false,
};
const films = [
  {
    id: 1,
    name: `Fantastic Beasts: The Crimes of Grindelwald`,
    posterImage: `img/fantastic-beasts-the-crimes-of-grindelwald.jpg`,
    previewImage: `img/fantastic-beasts-the-crimes-of-grindelwald.jpg`,
    backgroundImage: `img/bg-the-grand-budapest-hotel.jpg`,
    backgroundColor: `#ffffff`,
    videoLink: `https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b3/Big_Buck_Bunny_Trailer_400p.ogv/Big_Buck_Bunny_Trailer_400p.ogv.360p.webm`,
    previewVideoLink: `https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b3/Big_Buck_Bunny_Trailer_400p.ogv/Big_Buck_Bunny_Trailer_400p.ogv.360p.webm`,
    description: `Могущественный тёмный волшебник Геллерт Грин-де-Вальд пойман в Штатах, но не собирается молча сидеть в темнице и устраивает грандиозный побег. Теперь ничто не помешает ему добиться своей цели — установить превосходство волшебников над всеми немагическими существами на планете. Чтобы сорвать планы Грин-де-Вальда, Альбус Дамблдор обращается к своему бывшему студенту Ньюту Саламандеру, который соглашается помочь, не подозревая, какая опасность ему грозит. В раскалывающемся на части волшебном мире любовь и верность проверяются на прочность, а конфликт разделяет даже настоящих друзей и членов семей.`,
    rating: 6.7,
    scoresCount: 264039,
    director: `Дэвид Йейтс`,
    starring: [`Эдди Редмэйн`, `Джонни Депп`, `Кэтрин Уотерстон`, `Элисон Судол`, `Дэн Фоглер`, `Джуд Лоу`, `Эзра Миллер`, `Зои Кравиц`],
    runTime: 134,
    genre: `adventure`,
    released: 2018,
    isFavorite: false,
  },
  {
    id: 2,
    name: `Bohemian Rhapsody`,
    posterImage: `img/bohemian-rhapsody.jpg`,
    previewImage: `img/bohemian-rhapsody.jpg`,
    backgroundImage: `img/bg-the-grand-budapest-hotel.jpg`,
    backgroundColor: `#ffffff`,
    videoLink: `https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b3/Big_Buck_Bunny_Trailer_400p.ogv/Big_Buck_Bunny_Trailer_400p.ogv.360p.webm`,
    previewVideoLink: `https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b3/Big_Buck_Bunny_Trailer_400p.ogv/Big_Buck_Bunny_Trailer_400p.ogv.360p.webm`,
    description: `Чествование группы Queen, их музыки и их выдающегося вокалиста Фредди Меркьюри, который бросил вызов стереотипам и победил условности, чтобы стать одним из самых любимых артистов на планете. Фильм прослеживает головокружительный путь группы к успеху благодаря их культовым песням и революционному звуку, практически распад коллектива, поскольку образ жизни Меркьюри выходит из-под контроля, и их триумфальное воссоединение накануне концерта Live Aid, ставшим одним из величайших выступлений в истории рок-музыки.`,
    rating: 8.0,
    scoresCount: 408384,
    director: `Брайан Сингер`,
    starring: [`Рами Малек`, `Люси Бойнтон`, `Гвилим Ли`, `Бен Харди`, `Джозеф Маццелло`, `Эйдан Гиллен`, `Аллен Лич`],
    runTime: 134,
    genre: `drama`,
    released: 2018,
    isFavorite: false,
  },
  {
    id: 3,
    name: `Revenant`,
    posterImage: `img/revenant.jpg`,
    previewImage: `img/revenant.jpg`,
    backgroundImage: `img/bg-the-grand-budapest-hotel.jpg`,
    backgroundColor: `#ffffff`,
    videoLink: `https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b3/Big_Buck_Bunny_Trailer_400p.ogv/Big_Buck_Bunny_Trailer_400p.ogv.360p.webm`,
    previewVideoLink: `https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b3/Big_Buck_Bunny_Trailer_400p.ogv/Big_Buck_Bunny_Trailer_400p.ogv.360p.webm`,
    description: `Охотник Хью Гласс серьезно ранен на неизведанных просторах американского Дикого Запада. Товарищ Хью по отряду покорителей новых земель Джон Фицжеральд предательски оставляет его умирать в одиночестве. Теперь у Гласса осталось только одно оружие – его сила воли. Он готов бросить вызов первобытной природе, суровой зиме и враждебным племенам индейцев, только чтобы выжить и отомстить Фицжеральду.`,
    rating: 7.8,
    scoresCount: 350594,
    director: `Алехандро Гонсалес Иньярриту`,
    starring: [`Леонардо ДиКаприо`, `Том Харди`, `Донал Глисон`, `Уилл Поултер`, `Форрест Гудлак`, `Пол Андерсон`, `Кристоффер Йонер`],
    runTime: 156,
    genre: `drama`,
    released: 2015,
    isFavorite: false,
  },
];
const filmsFromServer = [
  {
    "id": 1,
    "name": `Fantastic Beasts: The Crimes of Grindelwald`,
    "poster_image": `img/fantastic-beasts-the-crimes-of-grindelwald.jpg`,
    "preview_image": `img/fantastic-beasts-the-crimes-of-grindelwald.jpg`,
    "background_image": `img/bg-the-grand-budapest-hotel.jpg`,
    "background_color": `#ffffff`,
    "video_link": `https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b3/Big_Buck_Bunny_Trailer_400p.ogv/Big_Buck_Bunny_Trailer_400p.ogv.360p.webm`,
    "preview_video_link": `https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b3/Big_Buck_Bunny_Trailer_400p.ogv/Big_Buck_Bunny_Trailer_400p.ogv.360p.webm`,
    "description": `Могущественный тёмный волшебник Геллерт Грин-де-Вальд пойман в Штатах, но не собирается молча сидеть в темнице и устраивает грандиозный побег. Теперь ничто не помешает ему добиться своей цели — установить превосходство волшебников над всеми немагическими существами на планете. Чтобы сорвать планы Грин-де-Вальда, Альбус Дамблдор обращается к своему бывшему студенту Ньюту Саламандеру, который соглашается помочь, не подозревая, какая опасность ему грозит. В раскалывающемся на части волшебном мире любовь и верность проверяются на прочность, а конфликт разделяет даже настоящих друзей и членов семей.`,
    "rating": 6.7,
    "scores_count": 264039,
    "director": `Дэвид Йейтс`,
    "starring": [`Эдди Редмэйн`, `Джонни Депп`, `Кэтрин Уотерстон`, `Элисон Судол`, `Дэн Фоглер`, `Джуд Лоу`, `Эзра Миллер`, `Зои Кравиц`],
    "run_time": 134,
    "genre": `adventure`,
    "released": 2018,
    "is_favorite": false,
  },
  {
    "id": 2,
    "name": `Bohemian Rhapsody`,
    "poster_image": `img/bohemian-rhapsody.jpg`,
    "preview_image": `img/bohemian-rhapsody.jpg`,
    "background_image": `img/bg-the-grand-budapest-hotel.jpg`,
    "background_color": `#ffffff`,
    "video_link": `https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b3/Big_Buck_Bunny_Trailer_400p.ogv/Big_Buck_Bunny_Trailer_400p.ogv.360p.webm`,
    "preview_video_link": `https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b3/Big_Buck_Bunny_Trailer_400p.ogv/Big_Buck_Bunny_Trailer_400p.ogv.360p.webm`,
    "description": `Чествование группы Queen, их музыки и их выдающегося вокалиста Фредди Меркьюри, который бросил вызов стереотипам и победил условности, чтобы стать одним из самых любимых артистов на планете. Фильм прослеживает головокружительный путь группы к успеху благодаря их культовым песням и революционному звуку, практически распад коллектива, поскольку образ жизни Меркьюри выходит из-под контроля, и их триумфальное воссоединение накануне концерта Live Aid, ставшим одним из величайших выступлений в истории рок-музыки.`,
    "rating": 8.0,
    "scores_count": 408384,
    "director": `Брайан Сингер`,
    "starring": [`Рами Малек`, `Люси Бойнтон`, `Гвилим Ли`, `Бен Харди`, `Джозеф Маццелло`, `Эйдан Гиллен`, `Аллен Лич`],
    "run_time": 134,
    "genre": `drama`,
    "released": 2018,
    "is_favorite": false,
  },
  {
    "id": 3,
    "name": `Revenant`,
    "poster_image": `img/revenant.jpg`,
    "preview_image": `img/revenant.jpg`,
    "background_image": `img/bg-the-grand-budapest-hotel.jpg`,
    "background_color": `#ffffff`,
    "video_link": `https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b3/Big_Buck_Bunny_Trailer_400p.ogv/Big_Buck_Bunny_Trailer_400p.ogv.360p.webm`,
    "preview_video_link": `https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b3/Big_Buck_Bunny_Trailer_400p.ogv/Big_Buck_Bunny_Trailer_400p.ogv.360p.webm`,
    "description": `Охотник Хью Гласс серьезно ранен на неизведанных просторах американского Дикого Запада. Товарищ Хью по отряду покорителей новых земель Джон Фицжеральд предательски оставляет его умирать в одиночестве. Теперь у Гласса осталось только одно оружие – его сила воли. Он готов бросить вызов первобытной природе, суровой зиме и враждебным племенам индейцев, только чтобы выжить и отомстить Фицжеральду.`,
    "rating": 7.8,
    "scores_count": 350594,
    "director": `Алехандро Гонсалес Иньярриту`,
    "starring": [`Леонардо ДиКаприо`, `Том Харди`, `Донал Глисон`, `Уилл Поултер`, `Форрест Гудлак`, `Пол Андерсон`, `Кристоффер Йонер`],
    "run_time": 156,
    "genre": `drama`,
    "released": 2015,
    "is_favorite": false,
  },
];
const authInfo = {
  "avatarUrl": `https://assets.htmlacademy.ru/intensives/javascript-3/avatar/2.jpg`,
  "email": `keks@mail.ru`,
  "id": 1,
  "name": `keks`
};
const reviews = [
  {
    id: 1,
    user: {
      id: 1,
      name: `Keks`
    },
    rating: 5.5,
    comment: `Not bad`,
    date: `2021-05-27T08:07:25.804Z`
  },
  {
    id: 2,
    user: {
      id: 2,
      name: `Mollie`
    },
    rating: 4.0,
    comment: `Good`,
    date: `2021-06-04T08:07:25.804Z`
  }
];

describe(`Reducer 'filmsData' should work correctly`, () => {
  it(`Reducer without additional parameters should return initial state`, () => {
    expect(filmsData(undefined, {})).toEqual(initialState);
  });

  it(`Reducer should update films by load films`, () => {
    const loadFilmsAction = {
      type: ActionType.LOAD_FILMS,
      payload: films
    };

    expect(filmsData(initialState, loadFilmsAction)).toEqual({...initialState, films, isDataLoaded: true, isOneFilmLoaded: true});
  });

  it(`Reducer should update films by load film`, () => {
    const loadFilmAction = {
      type: ActionType.LOAD_FILM,
      payload: films[0]
    };

    expect(filmsData(initialState, loadFilmAction)).toEqual({...initialState, films: films[0], isOneFilmLoaded: true});
  });

  it(`Reducer should update promoFilm by load promoFilm`, () => {
    const loadPromoFilmAction = {
      type: ActionType.LOAD_PROMO_FILM,
      payload: films[1]
    };

    expect(filmsData(initialState, loadPromoFilmAction)).toEqual({...initialState, promoFilm: films[1], isPromoFilmLoaded: true});
  });

  it(`Reducer should update favoriteFilms by load favoriteFilms`, () => {
    const loadFavoriteFilmsAction = {
      type: ActionType.LOAD_FAVORITE_FILMS,
      payload: films
    };

    expect(filmsData(initialState, loadFavoriteFilmsAction)).toEqual({...initialState, favorite: films, isFavoriteFilmsLoaded: true});
  });

  it(`Reducer should update favoriteFilms by add film to favoriteFilms if favorite havn't item`, () => {
    const addToFavoriteFilmsAction = {
      type: ActionType.ADD_TO_FAVORITE,
      payload: films[1]
    };

    expect(filmsData(initialState, addToFavoriteFilmsAction)).toEqual({...initialState, favorite: [films[1]]});
  });

  it(`Reducer should update favoriteFilms by add film to favoriteFilms if favorite have item`, () => {
    const addToFavoriteFilmsAction = {
      type: ActionType.ADD_TO_FAVORITE,
      payload: films[1]
    };

    expect(filmsData({...initialState, favorite: [films[0]]}, addToFavoriteFilmsAction)).toEqual({...initialState, favorite: [films[0], films[1]]});
  });

  it(`Reducer should update authInfo by load authInfo`, () => {
    const loadAuthInfoAction = {
      type: ActionType.LOAD_AUTH_INFO,
      payload: authInfo
    };

    expect(filmsData(initialState, loadAuthInfoAction)).toEqual({...initialState, authInfo});
  });

  it(`Reducer should update reviews by load reviews`, () => {
    const loadReviewsAction = {
      type: ActionType.LOAD_REVIEW,
      payload: reviews
    };

    expect(filmsData(initialState, loadReviewsAction)).toEqual({...initialState, reviews, isReviewLoaded: true});
  });

  it(`Reducer should reset reviews`, () => {
    const resetReviewsAction = {
      type: ActionType.RESET_REVIEW
    };

    expect(filmsData({...initialState, reviews, isReviewLoaded: true}, resetReviewsAction)).toEqual({...initialState, reviews, isReviewLoaded: false});
  });
});

describe(`Async operation should work correctly`, () => {
  it(`Should make a correct API call to /films; favorite films not loaded; favorite film list empty`, () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const filmListLoader = fetchFilmList();

    apiMock
      .onGet(APIRoute.FILMS)
      .reply(200, filmsFromServer);

    return filmListLoader(dispatch, () => ({DATA: initialState}), api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(2);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.LOAD_FILMS,
          payload: films
        });

        expect(dispatch).toHaveBeenNthCalledWith(2, {
          type: ActionType.LOAD_FAVORITE_FILMS,
          payload: []
        });
      });
  });

  it(`Should make a correct API call to /films; favorite films not loaded; favorite film list not empty`, () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const filmListLoader = fetchFilmList();

    apiMock
      .onGet(APIRoute.FILMS)
      .reply(200, [filmsFromServer[0], {...filmsFromServer[1], "is_favorite": true}, filmsFromServer[2]]);

    return filmListLoader(dispatch, () => ({DATA: initialState}), api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(2);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.LOAD_FILMS,
          payload: [films[0], {...films[1], "isFavorite": true}, films[2]]
        });

        expect(dispatch).toHaveBeenNthCalledWith(2, {
          type: ActionType.LOAD_FAVORITE_FILMS,
          payload: [{...films[1], "isFavorite": true}]
        });
      });
  });

  it(`Should make a correct API call to /films, favorite films loaded`, () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const filmListLoader = fetchFilmList();

    apiMock
      .onGet(APIRoute.FILMS)
      .reply(200, filmsFromServer);

    return filmListLoader(dispatch, () => ({DATA: {...initialState, isFavoriteFilmsLoaded: true}}), api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.LOAD_FILMS,
          payload: films
        });
      });
  });

  it(`Should make a correct API call to /films/id`, () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const id = 1;
    const filmLoader = fetchFilm(id);

    apiMock
      .onGet(`${APIRoute.FILMS}/${id}`)
      .reply(200, filmsFromServer[0]);

    return filmLoader(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.LOAD_FILM,
          payload: [films[0]]
        });
      });
  });

  it(`Should make a redirect on error, when API call to wrong /films/id`, () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const id = 100;
    const filmLoader = fetchFilm(id);

    apiMock
      .onGet(`${APIRoute.FILMS}/${id}`)
      .reply(404);

    return filmLoader(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);

        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.REDIRECT_TO_ROUTE,
          payload: APPRoute.FILMS,
        });
      });
  });

  it(`Should make a correct API call to /films/promo`, () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const promoFilmLoader = fetchPromoFilm();

    apiMock
      .onGet(APIRoute.PROMO)
      .reply(200, filmsFromServer[0]);

    return promoFilmLoader(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.LOAD_PROMO_FILM,
          payload: films[0]
        });
      });
  });

  it(`Should make a correct API call to /favorite`, () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const favoriteLoader = fetchFavoriteFilms();

    apiMock
      .onGet(APIRoute.FAVORITE)
      .reply(200, filmsFromServer);

    return favoriteLoader(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.LOAD_FAVORITE_FILMS,
          payload: films
        });
      });
  });
});
