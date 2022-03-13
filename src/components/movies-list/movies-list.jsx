import React, {useState} from "react";
import moviesListProp from "./movies-list.prop.js";
import MovieCard from "../movie-card/movie-card";

const MoviesList = (props) => {
  const {films} = props;
  const [activeCard, setActiveCard] = useState(null);

  return (
    <div className="catalog__movies-list">
      {films.map((film) =>
        <MovieCard
          key = {film.id}
          film = {film}
          isPlaying = {activeCard === film.id}
          onMouseOver = {(item) => setActiveCard(item)}
        />
      )}
    </div>
  );
};

MoviesList.propTypes = {
  films: moviesListProp,
};

export default MoviesList;
