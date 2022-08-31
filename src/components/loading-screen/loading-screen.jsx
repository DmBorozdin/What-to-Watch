import React from "react";

const LoadingScreen = () => {
  return (
    <div className= "preloader" data-testid="preloader">
      <div className= "preloader_container">
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
