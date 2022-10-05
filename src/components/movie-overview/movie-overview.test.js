import React from "react";
import {render, screen} from "@testing-library/react";
import MovieOverview from "./movie-overview";

it(`MovieOverview should render correctly`, () => {
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

  render(
      <MovieOverview film={mockFilm}/>
  );

  expect(screen.getByText(`6.7`)).toBeInTheDocument();
  expect(screen.getByText(`Good`)).toBeInTheDocument();
  expect(screen.getByText(`264039 ratings`)).toBeInTheDocument();
  expect(screen.getByText(`Могущественный тёмный волшебник Геллерт Грин-де-Вальд пойман в Штатах, но не собирается молча сидеть в темнице и устраивает грандиозный побег. Теперь ничто не помешает ему добиться своей цели — установить превосходство волшебников над всеми немагическими существами на планете. Чтобы сорвать планы Грин-де-Вальда, Альбус Дамблдор обращается к своему бывшему студенту Ньюту Саламандеру, который соглашается помочь, не подозревая, какая опасность ему грозит. В раскалывающемся на части волшебном мире любовь и верность проверяются на прочность, а конфликт разделяет даже настоящих друзей и членов семей.`)
  ).toBeInTheDocument();
  expect(screen.getByText(`Director: Дэвид Йейтс`)).toBeInTheDocument();
  expect(screen.getByText(`Starring: Эдди Редмэйн, Джонни Депп, Кэтрин Уотерстон`)).toBeInTheDocument();
});
