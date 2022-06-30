import React from "react";
import {render, screen, fireEvent} from "@testing-library/react";
import {Router, Switch, Route} from "react-router-dom";
import configureStore from "redux-mock-store";
import userEvent from "@testing-library/user-event";
import {Provider} from "react-redux";
import * as redux from 'react-redux';
import {createMemoryHistory} from "history";
import {ReviewFormStatus, ReviewFormError} from "../../const";
import {ActionType} from "../../store/action";
import AddReview from "./add-review";
import {sendComment, fetchFilm} from "../../store/api-actions.js";

const mockStore = configureStore({});
let history;

jest.mock(`react-router-dom`, () => ({
  ...jest.requireActual(`react-router-dom`),
  useParams: jest.fn().mockReturnValue({id: `1`})
}));

jest.mock(`../../store/api-actions`, () => ({
  __esModule: true,
  ...jest.requireActual(`../../store/api-actions`),
  sendComment: jest.fn(() => `sendComment`),
  fetchFilm: jest.fn(() => `fetchFilm`)
}));

describe(`AddReview test`, () => {
  beforeEach(() => {
    history = createMemoryHistory();
    history.push(`/films/1/review`);
  });

  it(`AddReview should be render correctly`, () => {
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
        authInfo: {
          avatarUrl: `hello.jpg`
        },
        isOneFilmLoaded: true
      },
      REVIEW: {
        reviewFormStatus: ReviewFormStatus.ENABLE
      }
    });

    const {container} = render(
        <Provider store={store}>
          <Router history={history}>
            <AddReview />
          </Router>
        </Provider>
    );

    expect(container.querySelector(`.logo`)).toBeInTheDocument();
    expect(screen.getByAltText(`Fantastic Beasts: The Crimes of Grindelwald`)).toBeInTheDocument();
    expect(screen.getByAltText(`Fantastic Beasts: The Crimes of Grindelwald poster`)).toBeInTheDocument();
    expect(screen.getByText(`Fantastic Beasts: The Crimes of Grindelwald`)).toBeInTheDocument();
    expect(screen.getByText(`Add review`)).toBeInTheDocument();
    expect(screen.getByAltText(`User avatar`)).toBeInTheDocument();
    expect(screen.getAllByText(/Rating/i)).toHaveLength(10);
    expect(screen.getByPlaceholderText(`Review text`)).toBeInTheDocument();
    expect(screen.getByText(`Post`)).toBeInTheDocument();
  });

  it(`When user click on the Logo, it should be redirected to the main screen`, () => {
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
        authInfo: {
          avatarUrl: `hello.jpg`
        },
        isOneFilmLoaded: true
      },
      REVIEW: {
        reviewFormStatus: ReviewFormStatus.ENABLE
      }
    });

    const {container} = render(
        <Provider store={store}>
          <Router history={history}>
            <Switch>
              <Route exact path="/films/1/review">
                <AddReview />
              </Route>
              <Route exact path="/">
                <h1>Main screen</h1>
              </Route>
            </Switch>
          </Router>
        </Provider>
    );

    expect(container.querySelector(`.logo`)).toBeInTheDocument();
    expect(screen.getByAltText(`Fantastic Beasts: The Crimes of Grindelwald`)).toBeInTheDocument();
    expect(screen.getByAltText(`Fantastic Beasts: The Crimes of Grindelwald poster`)).toBeInTheDocument();
    expect(screen.getByText(`Fantastic Beasts: The Crimes of Grindelwald`)).toBeInTheDocument();
    userEvent.click(container.querySelector(`.logo__link`));
    expect(screen.getByText(/Main screen/i)).toBeInTheDocument();
  });

  it(`When user click on the Film name, it should be redirected to the film page`, () => {
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
        authInfo: {
          avatarUrl: `hello.jpg`
        },
        isOneFilmLoaded: true
      },
      REVIEW: {
        reviewFormStatus: ReviewFormStatus.ENABLE
      }
    });

    render(
        <Provider store={store}>
          <Router history={history}>
            <Switch>
              <Route exact path="/films/1/review">
                <AddReview />
              </Route>
              <Route exact path="/films/1">
                <h1>Film page</h1>
              </Route>
            </Switch>
          </Router>
        </Provider>
    );

    expect(screen.getByAltText(`Fantastic Beasts: The Crimes of Grindelwald`)).toBeInTheDocument();
    expect(screen.getByAltText(`Fantastic Beasts: The Crimes of Grindelwald poster`)).toBeInTheDocument();
    expect(screen.getByText(`Fantastic Beasts: The Crimes of Grindelwald`)).toBeInTheDocument();
    userEvent.click(screen.getByText(`Fantastic Beasts: The Crimes of Grindelwald`));
    expect(screen.getByText(/Film page/i)).toBeInTheDocument();
  });

  it(`When user click on the user avatar, it should be redirected to my list`, () => {
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
        authInfo: {
          avatarUrl: `hello.jpg`
        },
        isOneFilmLoaded: true
      },
      REVIEW: {
        reviewFormStatus: ReviewFormStatus.ENABLE
      }
    });
    const mockUseDispatch = jest.spyOn(redux, `useDispatch`);
    const mockDispatch = jest.fn();
    mockUseDispatch.mockReturnValue(mockDispatch);

    const {container} = render(
        <Provider store={store}>
          <Router history={history}>
            <AddReview />
          </Router>
        </Provider>
    );

    expect(screen.getByAltText(`Fantastic Beasts: The Crimes of Grindelwald`)).toBeInTheDocument();
    expect(screen.getByAltText(`Fantastic Beasts: The Crimes of Grindelwald poster`)).toBeInTheDocument();
    expect(screen.getByText(`Fantastic Beasts: The Crimes of Grindelwald`)).toBeInTheDocument();
    userEvent.click(container.querySelector(`.user-block__avatar`));
    expect(mockDispatch).toHaveBeenCalledWith({
      type: ActionType.REDIRECT_TO_ROUTE,
      payload: `/mylist`
    });
  });

  it(`When review is sent, function sendComment should be called and form must be blocked`, () => {
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
        authInfo: {
          avatarUrl: `hello.jpg`
        },
        isOneFilmLoaded: true
      },
      REVIEW: {
        reviewFormStatus: ReviewFormStatus.ENABLE
      }
    });
    const mockUseDispatch = jest.spyOn(redux, `useDispatch`);
    const mockDispatch = jest.fn();
    mockUseDispatch.mockReturnValue(mockDispatch);

    render(
        <Provider store={store}>
          <Router history={history}>
            <AddReview />
          </Router>
        </Provider>
    );

    userEvent.click(screen.getByLabelText(`Rating 5`));
    fireEvent.change(screen.getByPlaceholderText(`Review text`), {target: {value: `I love this movie. Great Immersive camera-work. This film is an experience and i has already seen it 4 times.`}});
    userEvent.click(screen.getByText(`Post`));
    expect(sendComment).toHaveBeenCalledWith({
      rating: `5`,
      comment: `I love this movie. Great Immersive camera-work. This film is an experience and i has already seen it 4 times.`,
      id: 1,
    });
    expect(mockDispatch).toHaveBeenCalledWith({
      type: ActionType.SET_REVIEW_FORM,
      payload: ReviewFormStatus.DISABLE
    });
  });

  it(`If there was an error in submitting the form at the last step, then the error should be reset on a new render.`, () => {
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
        authInfo: {
          avatarUrl: `hello.jpg`
        },
        isOneFilmLoaded: true
      },
      REVIEW: {
        reviewFormStatus: ReviewFormStatus.ENABLE,
        isReviewFormSubmError: ReviewFormError.ERROR
      }
    });
    const mockUseDispatch = jest.spyOn(redux, `useDispatch`);
    const mockDispatch = jest.fn();
    mockUseDispatch.mockReturnValue(mockDispatch);

    render(
        <Provider store={store}>
          <Router history={history}>
            <AddReview />
          </Router>
        </Provider>
    );

    expect(mockDispatch).toHaveBeenCalledWith({
      type: ActionType.SET_REVIEW_FORM_ERR,
      payload: ReviewFormError.NO_ERROR
    });
  });

  it(`If an error occurу while submitting the form, a message should appear`, () => {
    let state = {
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
        authInfo: {
          avatarUrl: `hello.jpg`
        },
        isOneFilmLoaded: true
      },
      REVIEW: {
        reviewFormStatus: ReviewFormStatus.ENABLE,
        isReviewFormSubmError: ReviewFormError.NO_ERROR
      }
    };

    const store = mockStore(() => state);
    const mockUseDispatch = jest.spyOn(redux, `useDispatch`);
    const mockDispatch = jest.fn();
    mockUseDispatch.mockReturnValue(mockDispatch);

    render(
        <Provider store={store}>
          <Router history={history}>
            <AddReview />
          </Router>
        </Provider>
    );

    expect(screen.getByAltText(`Fantastic Beasts: The Crimes of Grindelwald`)).toBeInTheDocument();
    expect(screen.getByAltText(`Fantastic Beasts: The Crimes of Grindelwald poster`)).toBeInTheDocument();
    expect(screen.getByText(`Fantastic Beasts: The Crimes of Grindelwald`)).toBeInTheDocument();
    expect(screen.queryByText(`An error occurred while submitting the form. Please try later.`)).not.toBeInTheDocument();

    state = {
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
        authInfo: {
          avatarUrl: `hello.jpg`
        },
        isOneFilmLoaded: true
      },
      REVIEW: {
        reviewFormStatus: ReviewFormStatus.ENABLE,
        isReviewFormSubmError: ReviewFormError.ERROR
      }
    };
    store.dispatch({type: `ANY_ACTION`});
    expect(screen.queryByText(`An error occurred while submitting the form. Please try later.`)).toBeInTheDocument();
  });

  it(`When film is not loaded film should be fetch from server and preloaser will appear`, () => {
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
        authInfo: {
          avatarUrl: `hello.jpg`
        },
        isOneFilmLoaded: false
      },
      REVIEW: {
        reviewFormStatus: ReviewFormStatus.ENABLE
      }
    });
    const mockUseDispatch = jest.spyOn(redux, `useDispatch`);
    const mockDispatch = jest.fn();
    mockUseDispatch.mockReturnValue(mockDispatch);

    render(
        <Provider store={store}>
          <Router history={history}>
            <AddReview />
          </Router>
        </Provider>
    );

    expect(fetchFilm).toHaveBeenCalledWith(1);
    expect(screen.getByTestId(`preloader`)).toBeInTheDocument();
  });
});
