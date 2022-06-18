import React from "react";
import {render, screen} from "@testing-library/react";
import configureStore from "redux-mock-store";
import userEvent from "@testing-library/user-event";
import {Provider} from "react-redux";
import * as redux from 'react-redux';
import TitleMovieCard from "./title-movie-card";
import {AuthorizationStatus} from "../../const";
import {ActionType} from "../../store/action";
import {sendFavoriteStatus} from "../../store/api-actions";

const mockStore = configureStore({});

jest.mock(`../user-block/user-block`, () => {
  const mockUserBlock = () => <>UserBlock</>;
  mockUserBlock.displayName = `mockUserBlock`;
  return {
    __esModule: true,
    default: () => mockUserBlock()
  };
});

jest.mock(`../../store/api-actions`, () => ({
  __esModule: true,
  ...jest.requireActual(`../../store/api-actions`),
  sendFavoriteStatus: jest.fn(() => `sendFavoriteStatus`),
}));

describe(`TitleMovieCard test`, () =>{
  it(`TitleMovieCard should be render correctly`, () => {
    const mockPromoFilm = {
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
        <Provider store={mockStore({})}>
          <TitleMovieCard promoFilm={mockPromoFilm} avatarUrl="" authorizationStatus={AuthorizationStatus.AUTH} onUserAvatarClick={jest.fn()}/>
        </Provider>
    );

    expect(screen.getByAltText(`Fantastic Beasts: The Crimes of Grindelwald`)).toBeInTheDocument();
    expect(container.querySelector(`.logo`)).toBeInTheDocument();
    expect(screen.getByText(`UserBlock`)).toBeInTheDocument();
    expect(screen.getByAltText(`Fantastic Beasts: The Crimes of Grindelwald poster`)).toBeInTheDocument();
    expect(screen.getByText(`Fantastic Beasts: The Crimes of Grindelwald`)).toBeInTheDocument();
    expect(screen.getByText(`adventure`)).toBeInTheDocument();
    expect(screen.getByText(`2018`)).toBeInTheDocument();
    expect(screen.getByText(`Play`)).toBeInTheDocument();
    expect(screen.getByText(`My list`)).toBeInTheDocument();
  });

  it(`When user click by "Play" should be redirect to Player`, () => {
    const mockPromoFilm = {
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

    const {container} = render(
        <Provider store={mockStore({})}>
          <TitleMovieCard promoFilm={mockPromoFilm} avatarUrl="" authorizationStatus={AuthorizationStatus.AUTH} onUserAvatarClick={jest.fn()}/>
        </Provider>
    );

    expect(screen.getByAltText(`Fantastic Beasts: The Crimes of Grindelwald`)).toBeInTheDocument();
    expect(screen.getByText(`Fantastic Beasts: The Crimes of Grindelwald`)).toBeInTheDocument();
    userEvent.click(container.querySelector(`.btn--play`));
    expect(mockDispatch).toHaveBeenCalledWith({
      type: ActionType.REDIRECT_TO_ROUTE,
      payload: `/player/1`
    });
  });

  it(`When user is not authorized and click by "My list" it should be redirect to Sign In`, () => {
    const mockPromoFilm = {
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

    const {container} = render(
        <Provider store={mockStore({})}>
          <TitleMovieCard promoFilm={mockPromoFilm} avatarUrl="" authorizationStatus={AuthorizationStatus.NO_AUTH} onUserAvatarClick={jest.fn()}/>
        </Provider>
    );

    expect(screen.getByAltText(`Fantastic Beasts: The Crimes of Grindelwald`)).toBeInTheDocument();
    expect(screen.getByText(`Fantastic Beasts: The Crimes of Grindelwald`)).toBeInTheDocument();
    userEvent.click(container.querySelector(`.btn--list`));
    expect(mockDispatch).toHaveBeenCalledWith({
      type: ActionType.REDIRECT_TO_ROUTE,
      payload: `/login`
    });
  });

  it(`When user is authorized and click by "My list" film should be add to favorite`, () => {
    const mockPromoFilm = {
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

    const {container} = render(
        <Provider store={mockStore({})}>
          <TitleMovieCard promoFilm={mockPromoFilm} avatarUrl="" authorizationStatus={AuthorizationStatus.AUTH} onUserAvatarClick={jest.fn()}/>
        </Provider>
    );

    expect(screen.getByAltText(`Fantastic Beasts: The Crimes of Grindelwald`)).toBeInTheDocument();
    expect(screen.getByText(`Fantastic Beasts: The Crimes of Grindelwald`)).toBeInTheDocument();
    userEvent.click(container.querySelector(`.btn--list`));
    expect(mockDispatch).toHaveBeenCalledWith(`sendFavoriteStatus`);
    expect(sendFavoriteStatus).toHaveBeenCalledWith(1, 1);
  });
});
