import React from "react";
import {render, screen} from "@testing-library/react";
import {Router} from "react-router-dom";
import {createMemoryHistory} from "history";
import configureStore from "redux-mock-store";
import * as redux from "react-redux";
import {Provider} from "react-redux";
import App from "./app";
import {APPRoute, AuthorizationStatus, ReviewFormStatus, ReviewFormError, Genre} from "../../const";

const mockStore = configureStore({});

describe(`Test routing`, () => {
  jest.spyOn(redux, `useSelector`);
  jest.spyOn(redux, `useDispatch`);

  it(`Render 'Main' when user navigate to '/' url`, () => {
    const store = mockStore({
      USER: {authorizationStatus: AuthorizationStatus.NO_AUTH},
      LIST: {selectedGenre: Genre.ALL_GENRE},
      DATA: {
        films: [{
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
        }],
        promoFilm: {
          id: 4,
          name: `Johnny English`,
          posterImage: `img/johnny-english.jpg`,
          previewImage: `img/johnny-english.jpg`,
          backgroundImage: `img/bg-the-grand-budapest-hotel.jpg`,
          backgroundColor: `#ffffff`,
          videoLink: `https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b3/Big_Buck_Bunny_Trailer_400p.ogv/Big_Buck_Bunny_Trailer_400p.ogv.360p.webm`,
          previewVideoLink: `https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b3/Big_Buck_Bunny_Trailer_400p.ogv/Big_Buck_Bunny_Trailer_400p.ogv.360p.webm`,
          description: `Действие фильма разворачивается через 8 лет после событий предшествующего фильма и с тех пор карьера сэра Джонни Инглиша ухудшается. За 5 лет до начала фильма его направили с заданием в Мозамбик, но миссия пошла ужасно плохо. С тех пор он живёт в пещере в горах Тибета, прячась ото всех из-за стыда, сожалений и обвинений в провале миссии.
          Фильм начинается, когда герой находится на крайне низком моральном уровне, пока ему не дают ещё один шанс. Британская разведка МИ-7 снова нуждается в нём и ей надо вернуть агента, чтобы тот сорвал заговор группы киллеров, планирующих убить китайского премьер-министра.`,
          rating: 6.6,
          scoresCount: 41576,
          director: `Оливер Паркер`,
          starring: [`Роуэн Эткинсон`, `Джиллиан Андерсон`, `Доминик Уэст`, `Розамунд Пайк`, `Дэниэл Калуя`, `Марк Иванир`, `Берн Горман`],
          runTime: 101,
          genre: `comedy`,
          released: 2011,
          isFavorite: false,
        },
        authInfo: {avatarUrl: ``},
        isDataLoaded: true,
        isPromoFilmLoaded: true,
      }
    });

    const history = createMemoryHistory();

    render(
        <Provider store={store}>
          <Router history={history}>
            <App />
          </Router>
        </Provider>
    );

    expect(screen.getByText(/Johnny English/i)).toBeInTheDocument();
    expect(screen.getByText(/comedy/i)).toBeInTheDocument();
    expect(screen.getByText(/2011/i)).toBeInTheDocument();
    expect(screen.getByText(/Sign in/i)).toBeInTheDocument();
    expect(screen.getByText(/Play/i)).toBeInTheDocument();
    expect(screen.getByText(/My list/i)).toBeInTheDocument();
    expect(screen.getByText(/All genres/i)).toBeInTheDocument();
    expect(screen.getByText(/adventure/i)).toBeInTheDocument();
    expect(screen.getByText(/drama/i)).toBeInTheDocument();
    expect(screen.getByText(/Fantastic Beasts: The Crimes of Grindelwald/i)).toBeInTheDocument();
    expect(screen.getByText(/Bohemian Rhapsody/i)).toBeInTheDocument();
  });

  it(`Render 'SignIn' when user navigate to '/login' url`, () => {
    const history = createMemoryHistory();
    history.push(APPRoute.LOGIN);

    render(
        <Provider store={mockStore({})}>
          <Router history={history}>
            <App/>
          </Router>
        </Provider>
    );

    screen.getAllByText(/Sign in/i).forEach((element) => expect(element).toBeInTheDocument());

    expect(screen.getByLabelText(/Email address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
  });

  it(`Render 'MyList' when user navigate to '/mylist' url`, () => {
    const store = mockStore({
      USER: {authorizationStatus: AuthorizationStatus.AUTH},
      DATA: {favorite: [], isFavoriteFilmsLoaded: true, isDataLoaded: true}
    });

    const history = createMemoryHistory();
    history.push(APPRoute.MYLIST);

    render(
        <Provider store={store}>
          <Router history={history}>
            <App />
          </Router>
        </Provider>
    );

    expect(screen.getByText(/My list/i)).toBeInTheDocument();
    expect(screen.getByText(/Log out/i)).toBeInTheDocument();
  });

  it(`Render 'Film' when user navigate to '/films/:id' url`, () => {
    const store = mockStore({
      USER: {authorizationStatus: AuthorizationStatus.NO_AUTH},
      DATA: {
        films: [{
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
        }],
        reviews: [],
        authInfo: {avatarUrl: ``},
        isOneFilmLoaded: true,
        isReviewLoaded: true,
      }
    });

    const history = createMemoryHistory();
    history.push(APPRoute.FILMS + `/1`);

    render(
        <Provider store={store}>
          <Router history={history}>
            <App />
          </Router>
        </Provider>
    );

    expect(screen.getByText(/Fantastic Beasts: The Crimes of Grindelwald/i)).toBeInTheDocument();
    expect(screen.getByText(/adventure/i)).toBeInTheDocument();
    expect(screen.getByText(/2018/i)).toBeInTheDocument();
    expect(screen.getByText(/Sign in/i)).toBeInTheDocument();
    expect(screen.getByText(/Overview/i)).toBeInTheDocument();
    expect(screen.getByText(/Details/i)).toBeInTheDocument();
    expect(screen.getByText(/Reviews/i)).toBeInTheDocument();
    expect(screen.getByText(/Play/i)).toBeInTheDocument();
    expect(screen.getByText(/My list/i)).toBeInTheDocument();
  });

  it(`Render 'AddReview' when user navigate to '/films/:id/review' url`, () => {
    const store = mockStore({
      USER: {authorizationStatus: AuthorizationStatus.AUTH},
      REVIEW: {reviewFormStatus: ReviewFormStatus.ENABLE, isReviewFormSubmError: ReviewFormError.NO_ERROR},
      DATA: {
        films: [{
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
        }],
        reviews: [],
        authInfo: {avatarUrl: ``},
        isOneFilmLoaded: true,
        isReviewLoaded: true,
      }
    });

    const history = createMemoryHistory();
    history.push(`${APPRoute.FILMS}/1${APPRoute.REVIEW}`);

    render(
        <Provider store={store}>
          <Router history={history}>
            <App />
          </Router>
        </Provider>
    );

    expect(screen.getByText(/Fantastic Beasts: The Crimes of Grindelwald/i)).toBeInTheDocument();
    expect(screen.getByText(/Add review/i)).toBeInTheDocument();
    expect(screen.getByText(/Post/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Review text/i)).toBeInTheDocument();
  });

  it(`Render 'Player' when user navigate to '/player/:id' url`, () => {
    window.HTMLMediaElement.prototype.play = () => {};
    window.HTMLMediaElement.prototype.pause = () => {};

    const store = mockStore({
      DATA: {
        films: [{
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
        }],
        isOneFilmLoaded: true,
      }
    });

    const history = createMemoryHistory();
    history.push(`${APPRoute.PLAYER}/1`);

    render(
        <Provider store={store}>
          <Router history={history}>
            <App />
          </Router>
        </Provider>
    );

    expect(screen.getByText(/Exit/i)).toBeInTheDocument();
    expect(screen.getByText(/Transpotting/i)).toBeInTheDocument();
    expect(screen.getByText(/Play/i)).toBeInTheDocument();
    expect(screen.getByText(/Full screen/i)).toBeInTheDocument();
  });

  it(`Render 'NotFoundScreen' when user navigate to non-existent route`, () => {
    const history = createMemoryHistory();
    history.push(APPRoute.FILMS);

    render(
        <Provider store={mockStore({})}>
          <Router history={history}>
            <App/>
          </Router>
        </Provider>
    );

    expect(screen.getByText(`404. Page not found`)).toBeInTheDocument();
    expect(screen.getByText(`Go to the home page`)).toBeInTheDocument();
  });
});

