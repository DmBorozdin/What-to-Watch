import {
  changeGenre,
  resetFilmsList,
  loadFilms,
  loadFilm,
  loadPromoFilm,
  loadFavoriteFilms,
  resetFavoriteList,
  requireAuthorization,
  ActionType,
  redirectToRoute,
  loadAuthInfo,
  loadReview,
  resetReview,
  setReviewForm,
  setReviewFormError
} from "./action";

describe(`Action creators work correctly`, () => {
  it(`Action creator for changing genre returns action with correct payload`, () => {
    const expectedAction = {
      type: ActionType.CHANGE_GENRE,
      payload: `Comedy`
    };
    const genre = `Comedy`;

    expect(changeGenre(genre)).toEqual(expectedAction);
  });

  it(`Action creator for reset films list returns action with undefined payload`, () => {
    const expectedAction = {
      type: ActionType.RESET_FILMS_LIST,
    };

    expect(resetFilmsList()).toEqual(expectedAction);
  });

  it(`Action creator for loading films returns action with correct payload`, () => {
    const expectedAction = {
      type: ActionType.LOAD_FILMS,
      payload: [
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
      ]
    };
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
    ];

    expect(loadFilms(films)).toEqual(expectedAction);
  });

  it(`Action creator for loading film returns action with correct payload`, () => {
    const expectedAction = {
      type: ActionType.LOAD_FILM,
      payload: {
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
      }
    };
    const film = {
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

    expect(loadFilm(film)).toEqual(expectedAction);
  });

  it(`Action creator for loading promo film returns action with correct payload`, () => {
    const expectedAction = {
      type: ActionType.LOAD_PROMO_FILM,
      payload: {
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
      }
    };
    const promoFilm = {
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

    expect(loadPromoFilm(promoFilm)).toEqual(expectedAction);
  });

  it(`Action creator for loading favorite films returns action with correct payload`, () => {
    const expectedAction = {
      type: ActionType.LOAD_FAVORITE_FILMS,
      payload: [
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
          isFavorite: true,
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
          isFavorite: true,
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
          isFavorite: true,
        },
      ]
    };
    const favoriteFilms = [
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
        isFavorite: true,
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
        isFavorite: true,
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
        isFavorite: true,
      },
    ];

    expect(loadFavoriteFilms(favoriteFilms)).toEqual(expectedAction);
  });

  it(`Action creator for reset favorite film list returns action with correct payload`, () => {
    const expectedAction = {
      type: ActionType.RESET_FAVORITE_LIST,
    };

    expect(resetFavoriteList()).toEqual(expectedAction);
  });

  it(`Action creator for requiring authorization returns action with correct payload`, () => {
    const expectedAction = {
      type: ActionType.REQUIRED_AUTHORIZATION,
      payload: `AUTH`
    };
    const status = `AUTH`;

    expect(requireAuthorization(status)).toEqual(expectedAction);
  });

  it(`Action creator for redirecting to Route returns action with correct payload`, () => {
    const expectedAction = {
      type: ActionType.REDIRECT_TO_ROUTE,
      payload: `/login`
    };
    const url = `/login`;

    expect(redirectToRoute(url)).toEqual(expectedAction);
  });

  it(`Action creator for loading Auth Info returns action with correct payload`, () => {
    const expectedAction = {
      type: ActionType.LOAD_AUTH_INFO,
      payload: {
        id: 1,
        email: `keks@mail.ru`,
        name: `keks`,
        avatarUrl: `https://assets.htmlacademy.ru/intensives/javascript-3/avatar/1.jpg`
      }
    };
    const authInfo = {
      id: 1,
      email: `keks@mail.ru`,
      name: `keks`,
      avatarUrl: `https://assets.htmlacademy.ru/intensives/javascript-3/avatar/1.jpg`
    };

    expect(loadAuthInfo(authInfo)).toEqual(expectedAction);
  });

  it(`Action creator for loading Reviews returns action with correct payload`, () => {
    const expectedAction = {
      type: ActionType.LOAD_REVIEW,
      payload: [
        {
          id: 1,
          user: {
            id: 1,
            name: `Keks`
          },
          rating: 5.5,
          comment: `Not bad`,
          date: `2021-05-27T08:07:25.804Z`
        },
        {
          id: 2,
          user: {
            id: 2,
            name: `Mollie`
          },
          rating: 4.0,
          comment: `Good`,
          date: `2021-06-04T08:07:25.804Z`
        }
      ]
    };
    const reviews = [
      {
        id: 1,
        user: {
          id: 1,
          name: `Keks`
        },
        rating: 5.5,
        comment: `Not bad`,
        date: `2021-05-27T08:07:25.804Z`
      },
      {
        id: 2,
        user: {
          id: 2,
          name: `Mollie`
        },
        rating: 4.0,
        comment: `Good`,
        date: `2021-06-04T08:07:25.804Z`
      }
    ];

    expect(loadReview(reviews)).toEqual(expectedAction);
  });

  it(`Action creator for reset Reviews returns action with undefined payload`, () => {
    const expectedAction = {
      type: ActionType.RESET_REVIEW,
    };

    expect(resetReview()).toEqual(expectedAction);
  });

  it(`Action creator for setting review form status returns action with correct payload`, () => {
    const expectedAction = {
      type: ActionType.SET_REVIEW_FORM,
      payload: `ENABLE`
    };
    const statusForm = `ENABLE`;

    expect(setReviewForm(statusForm)).toEqual(expectedAction);
  });

  it(`Action creator for setting review form error returns action with correct payload`, () => {
    const expectedAction = {
      type: ActionType.SET_REVIEW_FORM_ERR,
      payload: `ERROR`
    };
    const error = `ERROR`;

    expect(setReviewFormError(error)).toEqual(expectedAction);
  });
});
