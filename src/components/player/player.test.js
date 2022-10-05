import React from "react";
import {render, screen} from "@testing-library/react";
import {Router} from "react-router-dom";
import configureStore from "redux-mock-store";
import {Provider} from "react-redux";
import {createMemoryHistory} from "history";
import userEvent from "@testing-library/user-event";
import Player from "./player";

const mockStore = configureStore({});
let history;

jest.mock(`react-router-dom`, () => ({
  ...jest.requireActual(`react-router-dom`),
  useParams: jest.fn().mockReturnValue({id: `1`})
}));

const fakeHistory = {
  location: {pathname: ``},
  goBack() {
    this.location.pathname = `/back`;
  }
};

jest.mock(`../../browser-history`, () => fakeHistory);

describe(`Test Player`, () => {
  beforeAll(() => {
    window.HTMLMediaElement.prototype.play = () => {};
    window.HTMLMediaElement.prototype.pause = () => {};
  });

  beforeEach(() => {
    history = createMemoryHistory();
  });

  it(`Player should be render correctly`, () => {
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

    const {container} = render(
        <Provider store={store}>
          <Router history={history}>
            <Player />
          </Router>
        </Provider>
    );

    expect(container.querySelector(`video`)).toBeInTheDocument();
    expect(screen.getByText(/Exit/i)).toBeInTheDocument();
    expect(screen.getByText(/Fantastic Beasts: The Crimes of Grindelwald/i)).toBeInTheDocument();
    expect(screen.getByText(/Play/i)).toBeInTheDocument();
    expect(screen.getByText(/Full screen/i)).toBeInTheDocument();
  });

  it(`When user click Exit should be redirect to previous page`, () => {
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

    const {container} = render(
        <Provider store={store}>
          <Router history={history}>
            <Player />
          </Router>
        </Provider>
    );


    expect(container.querySelector(`video`)).toBeInTheDocument();
    userEvent.click(screen.getByText(/Exit/i));
    expect(fakeHistory.location.pathname).toBe(`/back`);
  });
});
