import React, {useRef, useEffect} from "react";
import {useDispatch} from "react-redux";
import {redirectToRoute} from "../../store/action";
import {CardVideoPlayerSize, APPRoute, FILM_START_DELAY} from "../../const";
import PropTypes from "prop-types";
import filmProp from "../../common-props/film.js";

const MovieCard = ({film, isPlaying, onMouseOver}) => {
  const handleMouseOver = () => onMouseOver(film.id);
  const videoRef = useRef();
  let setStartDelay = null;
  const dispatch = useDispatch();

  useEffect(() => {
    videoRef.current.muted = true;
    videoRef.current.onended = () => {
      videoRef.current.src = film.videoLink;
    };

    return () => {
      videoRef.current.pause();
      videoRef.current.oncanplaythrough = null;
      videoRef.current.onended = null;
      videoRef.current = null;
    };
  }, [film.videoLink]);

  useEffect(() => {
    if (isPlaying) {
      setStartDelay = setTimeout(() => videoRef.current.play(), FILM_START_DELAY);
    } else if (!videoRef.current.paused) {
      videoRef.current.pause();
      videoRef.current.currentTime = videoRef.current.duration;
    }

    return () => {
      clearTimeout(setStartDelay);
    };
  }, [isPlaying]);

  const handleFilmCardClick = () => {
    dispatch(redirectToRoute(`${APPRoute.FILMS}/${film.id}`));
  };

  return (
    <article
      className="small-movie-card catalog__movies-card"
      onMouseEnter = {handleMouseOver}
      onMouseLeave = {handleMouseOver}
      onClick = {handleFilmCardClick}
    >
      <div className="small-movie-card__image">
        <video src={film.videoLink} preload={`metadata`} poster={film.previewImage} ref={videoRef} width={CardVideoPlayerSize.WIDTH} height={CardVideoPlayerSize.HEIGHT}></video>;
      </div>
      <h3 className="small-movie-card__title">
        <a className="small-movie-card__link" href="#" onClick={(evt) => evt.preventDefault()}>{film.name}</a>
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
