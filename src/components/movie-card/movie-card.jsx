import React from "react";
import {Link} from "react-router-dom";
import VideoPlayer from "../video-player/video-player";
import {CardVideoPlayerSize, APPRoute} from "../../const";
import PropTypes from "prop-types";
import filmProp from "../../common-props/film.js";

const MovieCard = ({film, isPlaying, onMouseOver}) => {
  const handleMouseOver = () => onMouseOver(film.id);

  return (
    <article
      className="small-movie-card catalog__movies-card"
      onMouseEnter = {handleMouseOver}
      onMouseLeave = {handleMouseOver}
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
        <Link className="small-movie-card__link" to={`${APPRoute.FILMS}/${film.id}`}>{film.name}</Link>
      </h3>
    </article>
  );
};

MovieCard.propTypes = {
  film: filmProp,
  onMouseOver: PropTypes.func.isRequired,
  isPlaying: PropTypes.bool.isRequired,
};

export default React.memo(MovieCard, (prevProps, nextProps) => {
  return prevProps.isPlaying === nextProps.isPlaying;
});
