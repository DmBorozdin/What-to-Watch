import {Genre} from "./const";

export const filterFilmsByGenre = (films, genre) => {
  return genre !== Genre.ALL_GENRE ? films.filter((film) => film.genre === genre) : films;
};
