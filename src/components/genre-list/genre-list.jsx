import React from "react";
import PropTypes from "prop-types";

const GenreList = ({genreList, activeGenre, onGenreClick}) => {

  return <ul className="catalog__genres-list">
    {genreList.map((genre) =>
      <li className={`catalog__genres-item ${genre === activeGenre ? `catalog__genres-item--active` : ``}`} key={genre}>
        <a
          href="#"
          className="catalog__genres-link"
          onClick={(evt) => {
            evt.preventDefault();
            onGenreClick(genre);
          }}
        >
          {genre.charAt(0).toUpperCase() + genre.slice(1)}
        </a>
      </li>
    )}
  </ul>;
};

GenreList.propTypes = {
  genreList: PropTypes.arrayOf(PropTypes.string).isRequired,
  activeGenre: PropTypes.string.isRequired,
  onGenreClick: PropTypes.func.isRequired,
};

export default GenreList;
