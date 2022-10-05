import React from "react";
import {render, screen} from "@testing-library/react";
import {Router, Switch, Route} from "react-router-dom";
import configureStore from "redux-mock-store";
import userEvent from "@testing-library/user-event";
import {Provider} from "react-redux";
import * as redux from 'react-redux';
import {createMemoryHistory} from "history";
import Film from "./film";
import {AuthorizationStatus} from "../../const";
import {ActionType} from "../../store/action";
import {fetchComment, sendFavoriteStatus} from "../../store/api-actions";
import browserHistory from "../../browser-history";

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
];

jest.mock(`react-router-dom`, () => ({
  ...jest.requireActual(`react-router-dom`),
  useParams: jest.fn().mockReturnValue({id: `2`})
}));

jest.mock(`../tabs/tabs.jsx`, () => {
  const mockTabs = () => <>Tabs</>;
  mockTabs.displayName = `mockTabs`;
  return {
    __esModule: true,
    default: () => mockTabs()
  };
});

jest.mock(`../../store/api-actions`, () => ({
  __esModule: true,
  ...jest.requireActual(`../../store/api-actions`),
  sendFavoriteStatus: jest.fn(() => `sendFavoriteStatus`),
  fetchFilmList: jest.fn(() => `fetchFilmList`),
  fetchComment: jest.fn()
}));

describe(`Film test`, () => {
  beforeAll(() => {
    window.HTMLMediaElement.prototype.play = () => {};
    window.HTMLMediaElement.prototype.pause = () => {};
  });

  beforeEach(() => {
    history = createMemoryHistory();
    history.push(`/films/2`);
    browserHistory.push(`/films/2`);
  });

  it(`When user is authorized Film should be render correctly`, () => {
    const store = mockStore({
      DATA: {
        films,
        reviews: [],
        authInfo: {
          avatarUrl: `hello.jpg`
        },
        isDataLoaded: true,
        isReviewLoaded: true,
      },
      USER: {
        authorizationStatus: AuthorizationStatus.AUTH
      }
    });

    const {container} = render(
        <Provider store={store}>
          <Router history={browserHistory}>
            <Film />
          </Router>
        </Provider>
    );

    container.querySelectorAll(`.logo`).forEach((element) => expect(element).toBeInTheDocument());
    expect(screen.getByAltText(`User avatar`)).toBeInTheDocument();
    expect(screen.getByText(`Bohemian Rhapsody`)).toBeInTheDocument();
    expect(screen.getByText(`drama`)).toBeInTheDocument();
    expect(screen.getByText(`2018`)).toBeInTheDocument();
    expect(screen.getByText(`Play`)).toBeInTheDocument();
    expect(screen.getByText(`My list`)).toBeInTheDocument();
    expect(screen.getByText(`Add review`)).toBeInTheDocument();
    expect(screen.getByAltText(`Bohemian Rhapsody`)).toBeInTheDocument();
    expect(screen.getByAltText(`Bohemian Rhapsody poster`)).toBeInTheDocument();
    expect(screen.getByText(`Tabs`)).toBeInTheDocument();
    expect(screen.getByText(`More like this`)).toBeInTheDocument();
    expect(screen.getByText(`Revenant`)).toBeInTheDocument();
    expect(container.querySelectorAll(`.small-movie-card`)).toHaveLength(2);
  });

  it(`When user is not authorized Film should be render correctly`, () => {
    const store = mockStore({
      DATA: {
        films,
        reviews: [],
        authInfo: {
          avatarUrl: `hello.jpg`
        },
        isDataLoaded: true,
        isReviewLoaded: true,
      },
      USER: {
        authorizationStatus: AuthorizationStatus.NO_AUTH
      }
    });

    const {container} = render(
        <Provider store={store}>
          <Router history={browserHistory}>
            <Film />
          </Router>
        </Provider>
    );

    container.querySelectorAll(`.logo`).forEach((element) => expect(element).toBeInTheDocument());
    expect(screen.getByText(`Sign in`)).toBeInTheDocument();
    expect(screen.getByText(`Bohemian Rhapsody`)).toBeInTheDocument();
    expect(screen.getByText(`drama`)).toBeInTheDocument();
    expect(screen.getByText(`2018`)).toBeInTheDocument();
    expect(screen.getByText(`Play`)).toBeInTheDocument();
    expect(screen.getByText(`My list`)).toBeInTheDocument();
    expect(screen.queryByText(`Add review`)).not.toBeInTheDocument();
    expect(screen.getByAltText(`Bohemian Rhapsody`)).toBeInTheDocument();
    expect(screen.getByAltText(`Bohemian Rhapsody poster`)).toBeInTheDocument();
    expect(screen.getByText(`Tabs`)).toBeInTheDocument();
    expect(screen.getByText(`More like this`)).toBeInTheDocument();
    expect(screen.getByText(`Revenant`)).toBeInTheDocument();
    expect(container.querySelectorAll(`.small-movie-card`)).toHaveLength(2);
  });

  it(`When user click by "Play" should be redirect to Player`, () => {
    const store = mockStore({
      DATA: {
        films,
        reviews: [],
        authInfo: {
          avatarUrl: `hello.jpg`
        },
        isDataLoaded: true,
        isReviewLoaded: true,
      },
      USER: {
        authorizationStatus: AuthorizationStatus.AUTH
      }
    });

    const {container} = render(
        <Provider store={store}>
          <Router history={browserHistory}>
            <Route exact path="/films/2">
              <Film/>
            </Route>
            <Route exact path="/player/2">
              <h1>Player page</h1>
            </Route>
          </Router>
        </Provider>
    );

    expect(screen.getByText(`Bohemian Rhapsody`)).toBeInTheDocument();
    userEvent.click(container.querySelector(`.btn--play`));
    expect(screen.getByText(`Player page`)).toBeInTheDocument();
  });

  it(`When user is authorized and click by "My list" film should be add to favorite`, () => {
    const store = mockStore({
      DATA: {
        films,
        reviews: [],
        authInfo: {
          avatarUrl: `hello.jpg`
        },
        isDataLoaded: true,
        isReviewLoaded: true,
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
          <Router history={browserHistory}>
            <Film />
          </Router>
        </Provider>
    );

    expect(screen.getByText(`Bohemian Rhapsody`)).toBeInTheDocument();
    userEvent.click(container.querySelector(`.btn--list`));
    expect(mockDispatch).toHaveBeenCalledWith(`sendFavoriteStatus`);
    expect(sendFavoriteStatus).toHaveBeenCalledWith(2, 1);
  });

  it(`When user is not authorized and click by "My list" should be redirect to sign in`, () => {
    const store = mockStore({
      DATA: {
        films,
        reviews: [],
        authInfo: {
          avatarUrl: `hello.jpg`
        },
        isDataLoaded: true,
        isReviewLoaded: true,
      },
      USER: {
        authorizationStatus: AuthorizationStatus.NO_AUTH
      }
    });
    const mockUseDispatch = jest.spyOn(redux, `useDispatch`);
    const mockDispatch = jest.fn();
    mockUseDispatch.mockReturnValue(mockDispatch);

    const {container} = render(
        <Provider store={store}>
          <Router history={browserHistory}>
            <Route exact path="/films/2">
              <Film/>
            </Route>
            <Route exact path="/login">
              <h1>Login page</h1>
            </Route>
          </Router>
        </Provider>
    );

    expect(screen.getByText(`Bohemian Rhapsody`)).toBeInTheDocument();
    userEvent.click(container.querySelector(`.btn--list`));
    expect(screen.getByText(`Login page`)).toBeInTheDocument();
  });

  it(`When user is authorized and click by "Add review" should be redirect to review page`, () => {
    const store = mockStore({
      DATA: {
        films,
        reviews: [],
        authInfo: {
          avatarUrl: `hello.jpg`
        },
        isDataLoaded: true,
        isReviewLoaded: true,
      },
      USER: {
        authorizationStatus: AuthorizationStatus.AUTH
      }
    });

    render(
        <Provider store={store}>
          <Router history={browserHistory}>
            <Switch>
              <Route exact path="/films/2">
                <Film />
              </Route>
              <Route exact path="/films/2/review">
                <h1>Review page</h1>
              </Route>
            </Switch>
          </Router>
        </Provider>
    );

    expect(screen.getByText(`Bohemian Rhapsody`)).toBeInTheDocument();
    userEvent.click(screen.getByText(`Add review`));
    expect(screen.getByText(`Review page`)).toBeInTheDocument();
  });

  it(`When the user clicks on a small movie card from the list of similar movies, it should be redirected to that movie's page.`, () => {
    const store = mockStore({
      DATA: {
        films,
        reviews: [],
        authInfo: {
          avatarUrl: `hello.jpg`
        },
        isDataLoaded: true,
        isReviewLoaded: true,
      },
      USER: {
        authorizationStatus: AuthorizationStatus.NO_AUTH
      }
    });

    render(
        <Provider store={store}>
          <Router history={browserHistory}>
            <Switch>
              <Route exact path="/films/2">
                <Film />
              </Route>
              <Route exact path="/films/3">
                <h1>Film 3 page</h1>
              </Route>
            </Switch>
          </Router>
        </Provider>
    );

    expect(screen.getByText(`Bohemian Rhapsody`)).toBeInTheDocument();
    userEvent.click(screen.getByText(`Revenant`));
    expect(screen.getByText(`Film 3 page`)).toBeInTheDocument();
  });

  it(`When there are more than 4 movies in the list of similar movies, only 4 movie cards should be shown`, () => {
    const store = mockStore({
      DATA: {
        films: [
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
            name: `Aviator`,
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
            released: 2014,
            isFavorite: false,
          },
          {
            id: 6,
            name: `We need to talk about Kevin`,
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
            released: 2011,
            isFavorite: false,
          },
          {
            id: 7,
            name: `Macbeth`,
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
            released: 2015,
            isFavorite: false,
          },
        ],
        reviews: [],
        authInfo: {
          avatarUrl: `hello.jpg`
        },
        isDataLoaded: true,
        isReviewLoaded: true,
      },
      USER: {
        authorizationStatus: AuthorizationStatus.AUTH
      }
    });

    const {container} = render(
        <Provider store={store}>
          <Router history={browserHistory}>
            <Film />
          </Router>
        </Provider>
    );

    container.querySelectorAll(`.logo`).forEach((element) => expect(element).toBeInTheDocument());
    expect(screen.getByAltText(`User avatar`)).toBeInTheDocument();
    expect(screen.getByText(`Bohemian Rhapsody`)).toBeInTheDocument();
    expect(screen.getByText(`drama`)).toBeInTheDocument();
    expect(screen.getByText(`2018`)).toBeInTheDocument();
    expect(screen.getByText(`Play`)).toBeInTheDocument();
    expect(screen.getByText(`My list`)).toBeInTheDocument();
    expect(screen.getByText(`Add review`)).toBeInTheDocument();
    expect(screen.getByAltText(`Bohemian Rhapsody`)).toBeInTheDocument();
    expect(screen.getByAltText(`Bohemian Rhapsody poster`)).toBeInTheDocument();
    expect(screen.getByText(`Tabs`)).toBeInTheDocument();
    expect(screen.getByText(`More like this`)).toBeInTheDocument();
    expect(container.querySelectorAll(`.small-movie-card`)).toHaveLength(4);
  });

  it(`When film change should be reset reviews`, () => {
    const store = mockStore({
      DATA: {
        films,
        reviews: [],
        authInfo: {
          avatarUrl: `hello.jpg`
        },
        isDataLoaded: true,
        isReviewLoaded: true,
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
          <Router history={browserHistory}>
            <Film />
          </Router>
        </Provider>
    );

    expect(screen.getByText(`Bohemian Rhapsody`)).toBeInTheDocument();
    expect(mockDispatch).toHaveBeenCalledWith({
      type: ActionType.RESET_REVIEW
    });
  });

  it(`When film is not loaded film should be fetch from server and preloader will appear`, () => {
    const store = mockStore({
      DATA: {
        films,
        reviews: [],
        authInfo: {
          avatarUrl: `hello.jpg`
        },
        isDataLoaded: false,
        isReviewLoaded: true,
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
          <Router history={browserHistory}>
            <Film />
          </Router>
        </Provider>
    );

    expect(mockDispatch).toHaveBeenCalledTimes(2);
    expect(mockDispatch).toHaveBeenNthCalledWith(1, `fetchFilmList`);
    expect(mockDispatch).toHaveBeenNthCalledWith(2, {
      type: ActionType.RESET_REVIEW,
    });
    expect(screen.getByTestId(`preloader`)).toBeInTheDocument();
  });

  it(`If reviews is not loaded comment should be fetch from server`, () => {
    const store = mockStore({
      DATA: {
        films,
        reviews: [],
        authInfo: {
          avatarUrl: `hello.jpg`
        },
        isDataLoaded: true,
        isReviewLoaded: false,
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
          <Router history={browserHistory}>
            <Film />
          </Router>
        </Provider>
    );

    expect(fetchComment).toHaveBeenCalledWith(2);
  });
});
