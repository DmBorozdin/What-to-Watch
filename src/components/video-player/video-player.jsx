import React, {useRef, useEffect} from "react";
import PropTypes from "prop-types";

const VideoPlayer = ({videoLink, isPlaying, poster}) => {
  const videoRef = useRef();

  useEffect(() => {
    videoRef.current.src = videoLink;

    return () => {
      videoRef.current.pause();
      videoRef.current = null;
    };
  }, [videoLink]);

  useEffect(() => {
    if (isPlaying) {
      videoRef.current.play();
      return;
    }

    videoRef.current.pause();
  }, [isPlaying]);

  return <video ref={videoRef} poster={poster}></video>;
};

VideoPlayer.prototype = {
  videoLink: PropTypes.string.isRequired,
  isPlaying: PropTypes.bool.isRequired,
  poster: PropTypes.string.isRequired,
};

export default VideoPlayer;
