import React from "react";
import PropTypes from "prop-types";
import MovieCard from "../movie-card/movie-card";

const MoviesList = (props) => {
  const {films} = props;

  return (
    <div className="catalog__movies-list">
      {films.map((film) => <MovieCard key = {film.id} film = {film}/>)}
    </div>
  );
};

MoviesList.propTypes = {
  films: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    previewImage: PropTypes.string.isRequired,
    genre: PropTypes.string.isRequired,
    released: PropTypes.number.isRequired,
    videoLink: PropTypes.string.isRequired,
  }).isRequired).isRequired,
};

export default MoviesList;
