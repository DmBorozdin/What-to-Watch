import React from "react";
import {render, screen} from "@testing-library/react";
import configureStore from "redux-mock-store";
import userEvent from "@testing-library/user-event";
import {Provider} from "react-redux";
import * as redux from 'react-redux';
import {createMemoryHistory} from "history";
import Film from "./film";
import {AuthorizationStatus} from "../../const";
import {ActionType} from "../../store/action";
import {sendFavoriteStatus} from "../../store/api-actions";

const mockStore = configureStore({});
let history;

describe(`Film test`, () => {
  beforeEach(() => {
    history = createMemoryHistory();
    history.push(`/films/1/review`);
  });

  it(`Film should be render correctly`, () => {
    const store = mockStore({
      DATA: {
        films: [
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
        ],
        reviews: [],
        authInfo: {
          avatarUrl: `hello.jpg`
        },
        isOneFilmLoaded: true,
        isReviewLoaded: true,
      },
      USER: {
        authorizationStatus: AuthorizationStatus.AUTH
      }
    });
  });
});
