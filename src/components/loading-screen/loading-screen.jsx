import React from "react";
import styles from "./loading-screen.module.css";

const LoadingScreen = () => {
  return (
    <div className= {styles.preloader} data-testid="preloader">
      <div className= {styles.preloader_container }>
        <div></div>
        <div></div>
        <div>
          <div></div>
        </div>
        <div>
          <div></div>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
