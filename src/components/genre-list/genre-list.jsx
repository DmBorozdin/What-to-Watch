import React from "react";
import PropTypes from "prop-types";
import filmProp from "../../common-props/film.js";

const GenreList = ({films, activeGenre}) => {
  const genreList = Array.from(new Set([`all genres`, ...films.map((film) => film.genre)])).slice(0, 10);

  const handleGenreItemClick = (evt) => {
    evt.preventDefault();
  };

  return <ul className="catalog__genres-list">
    {genreList.map((genre) =>
      <li className={`catalog__genres-item ${genre === activeGenre ? `catalog__genres-item--active` : ``}`} key={genre}>
        <a href="#" className="catalog__genres-link" onClick={handleGenreItemClick}>{genre.charAt(0).toUpperCase() + genre.slice(1)}</a>
      </li>
    )}
  </ul>;
};

GenreList.propTypes = {
  films: PropTypes.arrayOf(filmProp).isRequired,
  activeGenre: PropTypes.string.isRequired,
};

export default GenreList;
