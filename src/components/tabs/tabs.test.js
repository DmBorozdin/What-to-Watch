import React from "react";
import {render, screen} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Tabs from "./tabs";

describe(`Tabs test`, ()=> {
  it(`Tabs should be render corretcly in initial state`, () => {
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
    const mockReviews = [
      {
        id: 1,
        comment: `This movie is perfect in all its categories: credits, sound track, production, casting, writing, photography, editing, acting, and direction.\nI was amazed with the freedom of the use of the camera. This movie will change the way movies are made. Slow-mo, stills, black and white, and color were all used to brilliant effect.`,
        date: `2022-05-15T15:42:38.380Z`,
        rating: 1.6,
        user: {
          id: 14,
          name: `Corey`
        }
      },
      {
        id: 2,
        comment: `I love this movie. This film is a milestone in cinematography. Great Immersive camera-work. This film is an experience and i has already seen it 4 times and I only see more quality of the film.`,
        date: `2022-05-10T15:42:38.380Z`,
        rating: 1.1,
        user: {
          id: 13,
          name: `Zak`
        }
      }
    ];
    const {container} = render(
        <Tabs film={mockFilm} reviews={mockReviews} isReviewLoaded={true} />
    );

    expect(container.querySelector(`.movie-card__desc`)).toBeInTheDocument();
    expect(screen.getByText(`Overview`)).toBeInTheDocument();
    expect(screen.getByText(`Details`)).toBeInTheDocument();
    expect(screen.getByText(`Reviews`)).toBeInTheDocument();
    expect(screen.getByText(`6.7`)).toBeInTheDocument();
    expect(screen.getByText(`264039 ratings`)).toBeInTheDocument();
    expect(screen.getByText(mockFilm.description)).toBeInTheDocument();
    expect(screen.getByText(`Director: Дэвид Йейтс`)).toBeInTheDocument();
    expect(screen.getByText(`Starring: Эдди Редмэйн, Джонни Депп, Кэтрин Уотерстон`)).toBeInTheDocument();
  });

  it(`When click button "Details" should be render correctly information`, () => {
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
    const mockReviews = [];
    const {container} = render(
        <Tabs film={mockFilm} reviews={mockReviews} isReviewLoaded={true} />
    );

    expect(container.querySelector(`.movie-card__desc`)).toBeInTheDocument();
    expect(container.querySelector(`.movie-rating`)).toBeInTheDocument();
    expect(container.querySelector(`.movie-card__text`)).toBeInTheDocument();
    userEvent.click(screen.getByText(`Details`));
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

  it(`When click button "Reviews" should be render correctly information`, () => {
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
    const mockReviews = [
      {
        id: 1,
        comment: `This movie is perfect in all its categories.`,
        date: `2022-05-15T15:42:38.380Z`,
        rating: 1.6,
        user: {
          id: 14,
          name: `Corey`
        }
      },
      {
        id: 2,
        comment: `I love this movie.`,
        date: `2022-05-10T15:42:38.380Z`,
        rating: 1.1,
        user: {
          id: 13,
          name: `Zak`
        }
      }
    ];
    const {container} = render(
        <Tabs film={mockFilm} reviews={mockReviews} isReviewLoaded={true} />
    );

    expect(container.querySelector(`.movie-card__desc`)).toBeInTheDocument();
    expect(container.querySelector(`.movie-rating`)).toBeInTheDocument();
    expect(container.querySelector(`.movie-card__text`)).toBeInTheDocument();
    userEvent.click(screen.getByText(`Reviews`));
    expect(screen.getByText(`This movie is perfect in all its categories.`)).toBeInTheDocument();
    expect(screen.getByText(`1.6`)).toBeInTheDocument();
    expect(screen.getByText(`Corey`)).toBeInTheDocument();
    expect(screen.getByText(`May 15, 2022`)).toBeInTheDocument();
    expect(screen.getByText(`I love this movie.`)).toBeInTheDocument();
    expect(screen.getByText(`1.1`)).toBeInTheDocument();
    expect(screen.getByText(`Zak`)).toBeInTheDocument();
    expect(screen.getByText(`May 10, 2022`)).toBeInTheDocument();
  });
});
