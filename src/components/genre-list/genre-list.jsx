import React from "react";
import PropTypes from "prop-types";
import filmProp from "../../common-props/film.js";

const GenreList = ({films}) => {
  const genre = films.map((film) => film.genre);
  console.log(genre);

  return <ul className="catalog__genres-list">
    <li className="catalog__genres-item catalog__genres-item--active">
      <a href="#" className="catalog__genres-link">All genres</a>
    </li>
    <li className="catalog__genres-item">
      <a href="#" className="catalog__genres-link">Comedies</a>
    </li>
    <li className="catalog__genres-item">
      <a href="#" className="catalog__genres-link">Crime</a>
    </li>
    <li className="catalog__genres-item">
      <a href="#" className="catalog__genres-link">Documentary</a>
    </li>
    <li className="catalog__genres-item">
      <a href="#" className="catalog__genres-link">Dramas</a>
    </li>
    <li className="catalog__genres-item">
      <a href="#" className="catalog__genres-link">Horror</a>
    </li>
    <li className="catalog__genres-item">
      <a href="#" className="catalog__genres-link">Kids & Family</a>
    </li>
    <li className="catalog__genres-item">
      <a href="#" className="catalog__genres-link">Romance</a>
    </li>
    <li className="catalog__genres-item">
      <a href="#" className="catalog__genres-link">Sci-Fi</a>
    </li>
    <li className="catalog__genres-item">
      <a href="#" className="catalog__genres-link">Thrillers</a>
    </li>
  </ul>;
};

GenreList.propTypes = {
  films: PropTypes.arrayOf(filmProp).isRequired,
};

export default GenreList;
