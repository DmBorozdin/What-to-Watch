import React from "react";
import {render, screen} from "@testing-library/react";
import {Router, Switch, Route} from "react-router-dom";
import configureStore from "redux-mock-store";
import userEvent from "@testing-library/user-event";
import {Provider} from "react-redux";
import * as redux from 'react-redux';
import {createMemoryHistory} from "history";
import Main from "./main";
import {AuthorizationStatus, Genre} from "../../const";
import {ActionType} from "../../store/action";

const mockStore = configureStore({});
let history;

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
  {
    id: 4,
    name: `A Star Is Born`,
    posterImage: `img/star-is-born.jpg`,
    previewImage: `img/star-is-born.jpg`,
    backgroundImage: `img/bg-star-is-born.jpg`,
    backgroundColor: `#ffffff`,
    videoLink: `https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b3/Big_Buck_Bunny_Trailer_400p.ogv/Big_Buck_Bunny_Trailer_400p.ogv.360p.webm`,
    previewVideoLink: `https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b3/Big_Buck_Bunny_Trailer_400p.ogv/Big_Buck_Bunny_Trailer_400p.ogv.360p.webm`,
    description: `A musician helps a young singer find fame as age and alcoholism send his own career into a downward spiral.`,
    rating: 3.9,
    scoresCount: 244484,
    director: `Bradley Cooper`,
    starring: [`Lady Gaga`, `Bradley Cooper`, `Sam Elliott`],
    runTime: 136,
    genre: `drama`,
    released: 2018,
    isFavorite: false,
  },
  {
    id: 5,
    name: `Snatch`,
    posterImage: `img/star-is-born.jpg`,
    previewImage: `img/star-is-born.jpg`,
    backgroundImage: `img/bg-star-is-born.jpg`,
    backgroundColor: `#ffffff`,
    videoLink: `https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b3/Big_Buck_Bunny_Trailer_400p.ogv/Big_Buck_Bunny_Trailer_400p.ogv.360p.webm`,
    previewVideoLink: `https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b3/Big_Buck_Bunny_Trailer_400p.ogv/Big_Buck_Bunny_Trailer_400p.ogv.360p.webm`,
    description: `A musician helps a young singer find fame as age and alcoholism send his own career into a downward spiral.`,
    rating: 3.9,
    scoresCount: 244484,
    director: `Bradley Cooper`,
    starring: [`Lady Gaga`, `Bradley Cooper`, `Sam Elliott`],
    runTime: 136,
    genre: `comedy`,
    released: 2000,
    isFavorite: false,
  },
  {
    id: 6,
    name: `Matrix`,
    posterImage: `img/star-is-born.jpg`,
    previewImage: `img/star-is-born.jpg`,
    backgroundImage: `img/bg-star-is-born.jpg`,
    backgroundColor: `#ffffff`,
    videoLink: `https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b3/Big_Buck_Bunny_Trailer_400p.ogv/Big_Buck_Bunny_Trailer_400p.ogv.360p.webm`,
    previewVideoLink: `https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b3/Big_Buck_Bunny_Trailer_400p.ogv/Big_Buck_Bunny_Trailer_400p.ogv.360p.webm`,
    description: `A musician helps a young singer find fame as age and alcoholism send his own career into a downward spiral.`,
    rating: 3.9,
    scoresCount: 244484,
    director: `Bradley Cooper`,
    starring: [`Lady Gaga`, `Bradley Cooper`, `Sam Elliott`],
    runTime: 136,
    genre: `action`,
    released: 1999,
    isFavorite: false,
  },
  {
    id: 7,
    name: `Shutter Island`,
    posterImage: `img/star-is-born.jpg`,
    previewImage: `img/star-is-born.jpg`,
    backgroundImage: `img/bg-star-is-born.jpg`,
    backgroundColor: `#ffffff`,
    videoLink: `https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b3/Big_Buck_Bunny_Trailer_400p.ogv/Big_Buck_Bunny_Trailer_400p.ogv.360p.webm`,
    previewVideoLink: `https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b3/Big_Buck_Bunny_Trailer_400p.ogv/Big_Buck_Bunny_Trailer_400p.ogv.360p.webm`,
    description: `A musician helps a young singer find fame as age and alcoholism send his own career into a downward spiral.`,
    rating: 3.9,
    scoresCount: 244484,
    director: `Bradley Cooper`,
    starring: [`Lady Gaga`, `Bradley Cooper`, `Sam Elliott`],
    runTime: 136,
    genre: `thriller`,
    released: 2010,
    isFavorite: false,
  },
  {
    id: 8,
    name: `Legend`,
    posterImage: `img/star-is-born.jpg`,
    previewImage: `img/star-is-born.jpg`,
    backgroundImage: `img/bg-star-is-born.jpg`,
    backgroundColor: `#ffffff`,
    videoLink: `https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b3/Big_Buck_Bunny_Trailer_400p.ogv/Big_Buck_Bunny_Trailer_400p.ogv.360p.webm`,
    previewVideoLink: `https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b3/Big_Buck_Bunny_Trailer_400p.ogv/Big_Buck_Bunny_Trailer_400p.ogv.360p.webm`,
    description: `A musician helps a young singer find fame as age and alcoholism send his own career into a downward spiral.`,
    rating: 3.9,
    scoresCount: 244484,
    director: `Bradley Cooper`,
    starring: [`Lady Gaga`, `Bradley Cooper`, `Sam Elliott`],
    runTime: 136,
    genre: `crime`,
    released: 2015,
    isFavorite: false,
  },
  {
    id: 9,
    name: `War of the Worlds`,
    posterImage: `img/star-is-born.jpg`,
    previewImage: `img/star-is-born.jpg`,
    backgroundImage: `img/bg-star-is-born.jpg`,
    backgroundColor: `#ffffff`,
    videoLink: `https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b3/Big_Buck_Bunny_Trailer_400p.ogv/Big_Buck_Bunny_Trailer_400p.ogv.360p.webm`,
    previewVideoLink: `https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b3/Big_Buck_Bunny_Trailer_400p.ogv/Big_Buck_Bunny_Trailer_400p.ogv.360p.webm`,
    description: `A musician helps a young singer find fame as age and alcoholism send his own career into a downward spiral.`,
    rating: 3.9,
    scoresCount: 244484,
    director: `Bradley Cooper`,
    starring: [`Lady Gaga`, `Bradley Cooper`, `Sam Elliott`],
    runTime: 136,
    genre: `adventure`,
    released: 2005,
    isFavorite: false,
  },
];

jest.mock(`../../store/api-actions`, () => ({
  __esModule: true,
  ...jest.requireActual(`../../store/api-actions`),
  fetchFilmList: jest.fn(() => `fetchFilmList`),
  fetchPromoFilm: jest.fn(() => `fetchPromoFilm`),
}));

describe(`Main test`, () => {
  beforeAll(() => {
    window.HTMLMediaElement.prototype.play = () => {};
    window.HTMLMediaElement.prototype.pause = () => {};
  });

  beforeEach(() => {
    history = createMemoryHistory();
  });

  it(`Main should be render correctly`, () => {
    const store = mockStore({
      DATA: {
        films,
        promoFilm: films[0],
        authInfo: {
          avatarUrl: `hello.jpg`
        },
        isDataLoaded: true,
        isPromoFilmLoaded: true,
      },
      LIST: {
        selectedGenre: Genre.ALL_GENRE,
      },
      USER: {
        authorizationStatus: AuthorizationStatus.AUTH
      }
    });

    const {container} = render(
        <Provider store={store}>
          <Router history={history}>
            <Main />
          </Router>
        </Provider>
    );

    container.querySelectorAll(`.logo`).forEach((element) => expect(element).toBeInTheDocument());
    expect(screen.getAllByText(`Fantastic Beasts: The Crimes of Grindelwald`)).toHaveLength(2);
    expect(screen.getByAltText(`User avatar`)).toBeInTheDocument();
    expect(container.querySelectorAll(`.catalog__genres-link`)).toHaveLength(7);
    expect(container.querySelectorAll(`.small-movie-card`)).toHaveLength(8);
    expect(screen.getByText(`Show more`)).toBeInTheDocument();
  });

  it(`When user is authorized and click by User avatar should be redirect to "my list"`, () => {
    const store = mockStore({
      DATA: {
        films,
        promoFilm: films[0],
        authInfo: {
          avatarUrl: `hello.jpg`
        },
        isDataLoaded: true,
        isPromoFilmLoaded: true,
      },
      LIST: {
        selectedGenre: Genre.ALL_GENRE,
      },
      USER: {
        authorizationStatus: AuthorizationStatus.AUTH
      }
    });
    const mockUseDispatch = jest.spyOn(redux, `useDispatch`);
    const mockDispatch = jest.fn();
    mockUseDispatch.mockReturnValue(mockDispatch);

    const {container} = render(
        <Provider store={store}>
          <Router history={history}>
            <Main />
          </Router>
        </Provider>
    );

    userEvent.click(container.querySelector(`.user-block__avatar`));
    expect(mockDispatch).toHaveBeenCalledWith({
      type: ActionType.REDIRECT_TO_ROUTE,
      payload: `/mylist`
    });
  });

  it(`When user is not authorized and click by "Sign in" should be redirect to sign in`, () => {
    const store = mockStore({
      DATA: {
        films,
        promoFilm: films[0],
        authInfo: {
          avatarUrl: `hello.jpg`
        },
        isDataLoaded: true,
        isPromoFilmLoaded: true,
      },
      LIST: {
        selectedGenre: Genre.ALL_GENRE,
      },
      USER: {
        authorizationStatus: AuthorizationStatus.NO_AUTH
      }
    });

    render(
        <Provider store={store}>
          <Router history={history}>
            <Switch>
              <Route exact path="/">
                <Main />
              </Route>
              <Route exact path="/login">
                <h1>Login page</h1>
              </Route>
            </Switch>
          </Router>
        </Provider>
    );

    expect(screen.getByText(`Sign in`)).toBeInTheDocument();
    userEvent.click(screen.getByText(`Sign in`));
    expect(screen.getByText(`Login page`)).toBeInTheDocument();
  });

  it(`When user click on "Show more" button, 8 more cards should be shown.The "Show More" button should disappear`, () => {
    const store = mockStore({
      DATA: {
        films,
        promoFilm: films[0],
        authInfo: {
          avatarUrl: `hello.jpg`
        },
        isDataLoaded: true,
        isPromoFilmLoaded: true,
      },
      LIST: {
        selectedGenre: Genre.ALL_GENRE,
      },
      USER: {
        authorizationStatus: AuthorizationStatus.AUTH
      }
    });

    const {container} = render(
        <Provider store={store}>
          <Router history={history}>
            <Main />
          </Router>
        </Provider>
    );

    userEvent.click(screen.getByText(`Show more`));
    expect(container.querySelectorAll(`.small-movie-card`)).toHaveLength(9);
    expect(screen.queryByText(`Show more`)).not.toBeInTheDocument();
  });

  it(`When user change genre, dispatch should be called with changeGenre action`, () => {
    const store = mockStore({
      DATA: {
        films,
        promoFilm: films[0],
        authInfo: {
          avatarUrl: `hello.jpg`
        },
        isDataLoaded: true,
        isPromoFilmLoaded: true,
      },
      LIST: {
        selectedGenre: Genre.ALL_GENRE,
      },
      USER: {
        authorizationStatus: AuthorizationStatus.AUTH
      }
    });
    const mockUseDispatch = jest.spyOn(redux, `useDispatch`);
    const mockDispatch = jest.fn();
    mockUseDispatch.mockReturnValue(mockDispatch);

    render(
        <Provider store={store}>
          <Router history={history}>
            <Main />
          </Router>
        </Provider>
    );

    userEvent.click(screen.getByText(`Crime`));
    expect(mockDispatch).toHaveBeenCalledWith({
      type: ActionType.CHANGE_GENRE,
      payload: `crime`
    });
  });

  it(`When data is not loaded film list should be fetch from server and preloaser will appear`, () => {
    const store = mockStore({
      DATA: {
        films,
        promoFilm: films[0],
        authInfo: {
          avatarUrl: `hello.jpg`
        },
        isDataLoaded: false,
        isPromoFilmLoaded: true,
      },
      LIST: {
        selectedGenre: Genre.ALL_GENRE,
      },
      USER: {
        authorizationStatus: AuthorizationStatus.AUTH
      }
    });
    const mockUseDispatch = jest.spyOn(redux, `useDispatch`);
    const mockDispatch = jest.fn();
    mockUseDispatch.mockReturnValue(mockDispatch);

    render(
        <Provider store={store}>
          <Router history={history}>
            <Main />
          </Router>
        </Provider>
    );

    expect(mockDispatch).toHaveBeenCalledWith(`fetchFilmList`);
    expect(screen.getByTestId(`preloader`)).toBeInTheDocument();
  });

  it(`When promo film is not loaded should be fetch from server and preloaser will appear`, () => {
    const store = mockStore({
      DATA: {
        films,
        promoFilm: films[0],
        authInfo: {
          avatarUrl: `hello.jpg`
        },
        isDataLoaded: true,
        isPromoFilmLoaded: false,
      },
      LIST: {
        selectedGenre: Genre.ALL_GENRE,
      },
      USER: {
        authorizationStatus: AuthorizationStatus.AUTH
      }
    });
    const mockUseDispatch = jest.spyOn(redux, `useDispatch`);
    const mockDispatch = jest.fn();
    mockUseDispatch.mockReturnValue(mockDispatch);

    render(
        <Provider store={store}>
          <Router history={history}>
            <Main />
          </Router>
        </Provider>
    );

    expect(mockDispatch).toHaveBeenCalledWith(`fetchPromoFilm`);
    expect(screen.getByTestId(`preloader`)).toBeInTheDocument();
  });

  it(`When page rendered, dispatch should be called with resetFilmsList action`, () => {
    const store = mockStore({
      DATA: {
        films,
        promoFilm: films[0],
        authInfo: {
          avatarUrl: `hello.jpg`
        },
        isDataLoaded: true,
        isPromoFilmLoaded: true,
      },
      LIST: {
        selectedGenre: Genre.ALL_GENRE,
      },
      USER: {
        authorizationStatus: AuthorizationStatus.AUTH
      }
    });
    const mockUseDispatch = jest.spyOn(redux, `useDispatch`);
    const mockDispatch = jest.fn();
    mockUseDispatch.mockReturnValue(mockDispatch);

    render(
        <Provider store={store}>
          <Router history={history}>
            <Main />
          </Router>
        </Provider>
    );

    expect(mockDispatch).toHaveBeenCalledWith({
      type: ActionType.RESET_FILMS_LIST,
    });
  });
});
