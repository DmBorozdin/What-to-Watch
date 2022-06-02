import React, {useRef, useEffect} from "react";
import PropTypes from "prop-types";
import {FILM_START_DELAY} from "../../const";

const MiniVideoPlayer = ({src, isPlaying, poster, width, height}) => {
  const videoRef = useRef();
  let setStartDelay = null;

  useEffect(() => {
    videoRef.current.muted = true;
    videoRef.current.onended = () => {
      videoRef.current.src = src;
    };

    return () => {
      videoRef.current.pause();
      videoRef.current.oncanplaythrough = null;
      videoRef.current.onended = null;
      videoRef.current = null;
    };
  }, [src]);

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

  return <video src={src} preload={`metadata`} poster={poster} ref={videoRef} width={width} height={height}></video>;
};

MiniVideoPlayer.propTypes = {
  src: PropTypes.string.isRequired,
  isPlaying: PropTypes.bool.isRequired,
  poster: PropTypes.string.isRequired,
  width: PropTypes.string.isRequired,
  height: PropTypes.string.isRequired,
};

export default MiniVideoPlayer;