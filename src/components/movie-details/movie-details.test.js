import React from "react";
import {render, screen} from "@testing-library/react";
import MovieDetails from "./movie-details";

it(`MovieDetails should render correctly`, () => {
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
    starring: [`Эдди Редмэйн`, `Джонни Депп`, `Кэтрин Уотерстон`],
    runTime: 134,
    genre: `adventure`,
    released: 2018,
    isFavorite: false,
  };

  render(<MovieDetails film={mockFilm}/>);

  expect(screen.getByText(`Director`)).toBeInTheDocument();
  expect(screen.getByText(`Дэвид Йейтс`)).toBeInTheDocument();
  expect(screen.getByText(`Starring`)).toBeInTheDocument();
  expect(screen.getByText(`Эдди Редмэйн, Джонни Депп, Кэтрин Уотерстон`)).toBeInTheDocument();
  expect(screen.getByText(`Run Time`)).toBeInTheDocument();
  expect(screen.getByText(`2h 14m`)).toBeInTheDocument();
  expect(screen.getByText(`Genre`)).toBeInTheDocument();
  expect(screen.getByText(`adventure`)).toBeInTheDocument();
  expect(screen.getByText(`Released`)).toBeInTheDocument();
  expect(screen.getByText(`2018`)).toBeInTheDocument();
});
