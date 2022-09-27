import React, {useRef, useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {useSelector, useDispatch} from "react-redux";
import {getTimeInFormatHMS} from "../../utils/common";
import browserHistory from "../../browser-history";
import {fetchFilm} from "../../store/api-actions";

const Player = () => {
  const {films, isOneFilmLoaded} = useSelector((state) => state.DATA);
  const pageId = Number(useParams().id);
  const film = films.find((item) => item.id === pageId);
  const videoRef = useRef();
  const [isLoading, setIsLoading] = useState(true);
  const [filmCurrentTime, setfilmCurrentTime] = useState(0);
  const [filmDuration, setfilmDuration] = useState(0);
  const dispatch = useDispatch();

  useEffect(() => {
    videoRef.current.oncanplaythrough = () => {
      setIsLoading(false);
      setfilmDuration(videoRef.current.duration);
      videoRef.current.play();
    };

    return () => {
      videoRef.current.pause();
      videoRef.current.oncanplaythrough = null;
      videoRef.current.onended = null;
      videoRef.current = null;
    };
  }, []);

  // useEffect(() => {
  //   if (!isLoading) {
  //     // videoRef.current.play();
  //     handlePlayClick();
  //   }
  // }, [isLoading]);

  useEffect(() => {
    if (!isOneFilmLoaded) {
      dispatch(fetchFilm(pageId));
    } else {
      videoRef.current.onended = () => {
        videoRef.current.src = film.videoLink;
      };
    }
  }, [isOneFilmLoaded]);

  const handleExitClick = () => {
    browserHistory.goBack();
  };

  const handlePlayClick = () => {
    if (!isLoading && !isFullScreen()) {
      if (videoRef.current.paused) {
        videoRef.current.play();
      } else {
        videoRef.current.pause();
      }
    }
  };

  const isFullScreen = () => {
    return (document.webkitIsFullScreen || document.mozFullScreen || document.msFullscreenElement || document.fullscreenElement);
  };

  const handleTimeUpdate = () => {
    setfilmCurrentTime(videoRef.current.currentTime);
  };

  const handleFullScreen = () => {
    if (isFullScreen()) {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.webkitCancelFullScreen) {
        document.webkitCancelFullScreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      }
    } else {
      if (videoRef.current.requestFullscreen) {
        videoRef.current.requestFullscreen();
      } else if (videoRef.current.mozRequestFullScreen) {
        videoRef.current.mozRequestFullScreen();
      } else if (videoRef.current.webkitRequestFullScreen) {
        videoRef.current.webkitRequestFullScreen();
      } else if (videoRef.current.msRequestFullscreen) {
        videoRef.current.msRequestFullscreen();
      }
    }
  };

  return (
    <div className="player">
      <video
        src={film ? film.videoLink : ``}
        preload={`metadata`}
        ref={videoRef}
        className="player__video"
        poster="img/player-poster.jpg"
        onTimeUpdate={handleTimeUpdate}
        onDoubleClick={handleFullScreen}
        onClick={handlePlayClick}
        // muted="muted"
        muted={true}
      />

      <button type="button" className="player__exit" onClick={handleExitClick}>Exit</button>

      <div className="player__controls">
        <div className="player__controls-row">
          <div className="player__time">
            <progress className="player__progress" value={`${(filmCurrentTime / filmDuration) * 100}`} max="100"></progress>
            <div className="player__toggler" style={{left: `${(filmCurrentTime / filmDuration) * 100}%`}}>Toggler</div>
          </div>
          <div className="player__time-value">{getTimeInFormatHMS(filmDuration - filmCurrentTime)}</div>
        </div>

        <div className="player__controls-row">
          <button type="button" className="player__play" onClick={handlePlayClick}>
            <svg viewBox="0 0 19 19" width="19" height="19">
              <use xlinkHref="#play-s"></use>
            </svg>
            <span>Play</span>
          </button>
          <div className="player__name">{isOneFilmLoaded ? film.name : `Transpotting`}</div>

          <button type="button" className="player__full-screen" onClick={handleFullScreen}>
            <svg viewBox="0 0 27 27" width="27" height="27">
              <use xlinkHref="#full-screen"></use>
            </svg>
            <span>Full screen</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Player;
