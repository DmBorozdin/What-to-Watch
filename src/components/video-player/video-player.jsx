import React, {useRef, useEffect, useState} from "react";
import PropTypes from "prop-types";

const VideoPlayer = ({videoLink, isPlaying, poster, ...props}) => {
  const videoRef = useRef();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    videoRef.current.muted = true;
    videoRef.current.oncanplaythrough = () => setIsLoading(false);
    videoRef.current.onended = () => {
      videoRef.current.src = videoLink;
    };

    return () => {
      videoRef.current.pause();
      videoRef.current.oncanplaythrough = null;
      videoRef.current.onended = null;
      videoRef.current = null;
    };
  }, [videoLink]);

  useEffect(() => {
    if (isPlaying && !isLoading) {
      videoRef.current.play();
      return;
    }
    if (!videoRef.current.paused) {
      videoRef.current.pause();
      videoRef.current.currentTime = videoRef.current.duration;
    }
  }, [isPlaying]);

  return <video src={videoLink} preload={`metadata`} poster={poster} ref={videoRef} {...props}></video>;
};

VideoPlayer.propTypes = {
  videoLink: PropTypes.string.isRequired,
  isPlaying: PropTypes.bool.isRequired,
  poster: PropTypes.string.isRequired,
};

export default VideoPlayer;
