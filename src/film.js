export const filterFilmsByGenre = (films, genre) => {
  return films.filter((film) => film.genre === genre);
};
