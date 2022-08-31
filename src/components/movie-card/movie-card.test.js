import React from "react";
import {render, screen} from "@testing-library/react";
import configureStore from "redux-mock-store";
import {Router} from "react-router-dom";
import * as redux from 'react-redux';
import {Provider} from "react-redux";
import {createMemoryHistory} from "history";
import userEvent from "@testing-library/user-event";
import MovieCard from "./movie-card";
import {ActionType} from "../../store/action";

const mockStore = configureStore({});
let history;

describe(`Test MovieCard`, () => {
  beforeAll(() => {
    window.HTMLMediaElement.prototype.play = () => {};
    window.HTMLMediaElement.prototype.pause = () => {};
  });

  beforeEach(() => {
    history = createMemoryHistory();
  });

  it(`MovieCard should be render correctly`, () => {
    const store = mockStore({});
    const mockFilm = {
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
    };
    const {container} = render(
        <Provider store={store}>
          <Router history={history}>
            <MovieCard film={mockFilm} isPlaying={false} onMouseOver={jest.fn()} />
          </Router>
        </Provider>
    );

    expect(screen.getByRole(`article`)).toBeInTheDocument();
    expect(container.querySelector(`video`)).toBeInTheDocument();
    expect(screen.getByText(/Fantastic Beasts: The Crimes of Grindelwald/i)).toBeInTheDocument();
  });

  it(`MovieCard should cal 'onMouseOver' function when mouse over the card`, () => {
    const store = mockStore({});
    const mockFilm = {
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
    };
    const handleMouseOver = jest.fn();
    render(
        <Provider store={store}>
          <Router history={history}>
            <MovieCard film={mockFilm} isPlaying={false} onMouseOver={handleMouseOver} />
          </Router>
        </Provider>
    );

    userEvent.hover(screen.getByRole(`article`));
    expect(handleMouseOver).toBeCalled();
    expect(handleMouseOver).toBeCalledWith(1);
    userEvent.unhover(screen.getByRole(`article`));
    expect(handleMouseOver).toBeCalled();
    expect(handleMouseOver).toBeCalledWith(1);
    expect(handleMouseOver).toBeCalledTimes(2);
  });

  it(`When user click by film name should be redirect`, () => {
    const store = mockStore({});
    const mockFilm = {
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
    };
    const mockUseDispatch = jest.spyOn(redux, `useDispatch`);
    const mockDispatch = jest.fn();
    mockUseDispatch.mockReturnValue(mockDispatch);
    const handleMouseOver = jest.fn();
    render(
        <Provider store={store}>
          <Router history={history}>
            <MovieCard film={mockFilm} isPlaying={false} onMouseOver={handleMouseOver} />
          </Router>
        </Provider>
    );

    expect(screen.getByText(/Fantastic Beasts: The Crimes of Grindelwald/i)).toBeInTheDocument();
    userEvent.click(screen.getByText(/Fantastic Beasts: The Crimes of Grindelwald/i));
    expect(mockDispatch).toHaveBeenCalledWith({
      type: ActionType.REDIRECT_TO_ROUTE,
      payload: `/films/1`
    });
  });
});
