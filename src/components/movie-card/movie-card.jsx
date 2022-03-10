import React from "react";
import {Link} from "react-router-dom";
import PropTypes from "prop-types";
import VideoPlayer from "../video-player/video-player";

const MovieCard = (props) => {
  const {film, isPlaying, onMouseOver} = props;

  const hadleMouseEnter = () => onMouseOver(film.id);
  const hadleMouseLeave = () => onMouseOver(null);

  return (
    <article
      className="small-movie-card catalog__movies-card"
      onMouseEnter = {hadleMouseEnter}
      onMouseLeave = {hadleMouseLeave}
    >
      <div className="small-movie-card__image">
        {/* <img src={film.previewImage} alt={film.name} width="280" height="175" /> */}
        <VideoPlayer videoLink={film.videoLink} isPlaying={isPlaying} poster={film.previewImage} width="280" height="175"/>
      </div>
      <h3 className="small-movie-card__title">
        <Link className="small-movie-card__link" to={`/films/${film.id}`}>{film.name}</Link>
      </h3>
    </article>
  );
};

MovieCard.propTypes = {
  film: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    previewImage: PropTypes.string.isRequired,
    genre: PropTypes.string.isRequired,
    released: PropTypes.number.isRequired,
    videoLink: PropTypes.string.isRequired,
  }).isRequired,
  onMouseOver: PropTypes.func,
  isPlaying: PropTypes.bool.isRequired,
};

export default MovieCard;
