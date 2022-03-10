import React, {useRef, useEffect, useState} from "react";
import PropTypes from "prop-types";

const VideoPlayer = ({videoLink, isPlaying, poster, ...props}) => {
  const videoRef = useRef();
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    videoRef.current.muted = true;
    videoRef.current.poster = poster;
    videoRef.current.oncanplay = () => setDuration(videoRef.current.duration);

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

    if (videoRef.current.played) {
      videoRef.current.currentTime = duration;
      videoRef.current.pause();
    }
  }, [isPlaying]);

  return <video src={videoLink} ref={videoRef} {...props}></video>;
};

VideoPlayer.propTypes = {
  videoLink: PropTypes.string.isRequired,
  isPlaying: PropTypes.bool.isRequired,
  poster: PropTypes.string.isRequired,
};

export default VideoPlayer;
