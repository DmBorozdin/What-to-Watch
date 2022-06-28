import React from "react";
import {render, screen} from "@testing-library/react";
import {Router, Switch, Route} from "react-router-dom";
import {createMemoryHistory} from "history";
import userEvent from "@testing-library/user-event";
import MovieCard from "./movie-card";

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
        <Router history={history}>
          <MovieCard film={mockFilm} isPlaying={false} onMouseOver={jest.fn()} />
        </Router>
    );

    expect(screen.getByRole(`article`)).toBeInTheDocument();
    expect(container.querySelector(`video`)).toBeInTheDocument();
    expect(screen.getByText(/Fantastic Beasts: The Crimes of Grindelwald/i)).toBeInTheDocument();
  });

  it(`MovieCard should cal 'onMouseOver' function when mouse over the card`, () => {
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
        <Router history={history}>
          <MovieCard film={mockFilm} isPlaying={false} onMouseOver={handleMouseOver} />
        </Router>
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
        <Router history={history}>
          <Switch>
            <Route exact path="/">
              <MovieCard film={mockFilm} isPlaying={false} onMouseOver={handleMouseOver} />
            </Route>
            <Route exact path="/films/1">
              <h1>Film screen</h1>
            </Route>
          </Switch>
        </Router>
    );

    expect(screen.getByText(/Fantastic Beasts: The Crimes of Grindelwald/i)).toBeInTheDocument();
    userEvent.click(screen.getByText(/Fantastic Beasts: The Crimes of Grindelwald/i));
    expect(screen.getByText(`Film screen`)).toBeInTheDocument();
  });
});
