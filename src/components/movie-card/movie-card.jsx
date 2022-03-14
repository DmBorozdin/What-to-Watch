import React from "react";
import {Link} from "react-router-dom";
import VideoPlayer from "../video-player/video-player";
import {CardVideoPlayerSize} from "../../const";
import movieCardProp from "./movie-card.prop";

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
        <VideoPlayer
          src={film.videoLink}
          isPlaying={isPlaying}
          poster={film.previewImage}
          width={CardVideoPlayerSize.WIDTH}
          height={CardVideoPlayerSize.HEIGHT}
        />
      </div>
      <h3 className="small-movie-card__title">
        <Link className="small-movie-card__link" to={`/films/${film.id}`}>{film.name}</Link>
      </h3>
    </article>
  );
};

MovieCard.propTypes = {
  film: movieCardProp.FILM,
  onMouseOver: movieCardProp.ONMOUSEOVER,
  isPlaying: movieCardProp.ISPLAYING,
};

export default MovieCard;
