import React, {useState} from "react";
import PropTypes from "prop-types";
import filmProp from "../../common-props/film.js";
import MovieCard from "../movie-card/movie-card";

const MoviesList = ({films, autoPlay}) => {
  const [activeCard, setActiveCard] = useState(null);

  const handleSetActiveCard = (id) => {
    if (autoPlay) {
      setActiveCard(activeCard === id ? -1 : id);
    }
  };

  return (
    <div className="catalog__movies-list">
      {films.map((film) =>
        <MovieCard
          key={`moviecard ${film.id}`}
          film={film}
          isPlaying={autoPlay && activeCard === film.id}
          onMouseOver={handleSetActiveCard}
        />
      )}
    </div>
  );
};

MoviesList.propTypes = {
  films: PropTypes.arrayOf(filmProp).isRequired,
  autoPlay: PropTypes.bool.isRequired,
};

export default MoviesList;
