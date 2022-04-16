import React from "react";
import PropTypes from "prop-types";
import filmProp from "../../common-props/film.js";
import {Genre} from "../../const.js";

const GenreList = ({films, activeGenre, onGenreClick}) => {
  const genreList = Array.from(new Set([Genre.ALL_GENRE, ...films.map((film) => film.genre)])).slice(0, 10);

  return <ul className="catalog__genres-list">
    {genreList.map((genre) =>
      <li className={`catalog__genres-item ${genre === activeGenre ? `catalog__genres-item--active` : ``}`} key={genre}>
        <a href="#" className="catalog__genres-link" onClick={(evt) => {
          evt.preventDefault();
          onGenreClick(genre);
        }}>
          {genre.charAt(0).toUpperCase() + genre.slice(1)}
        </a>
      </li>
    )}
  </ul>;
};

GenreList.propTypes = {
  films: PropTypes.arrayOf(filmProp).isRequired,
  activeGenre: PropTypes.string.isRequired,
  onGenreClick: PropTypes.func.isRequired,
};

export default GenreList;
