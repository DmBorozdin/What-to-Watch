import React, {Fragment} from "react";
import {Link} from "react-router-dom";
import {APPRoute} from "../../const";

const ServerNotAvailable = () => {
  return <Fragment>
    <div className="user-page">
      <header className="page-header">
        <div className="logo">
          <a className="logo__link">
            <span className="logo__letter logo__letter--1">W</span>
            <span className="logo__letter logo__letter--2">T</span>
            <span className="logo__letter logo__letter--3">W</span>
          </a>
        </div>
      </header>

      <div className="user-page__content">
        <h1>Server not available</h1>
        <p>Please try to load the page later</p>
        <Link to={APPRoute.MAIN}>Go to the home page</Link>
      </div>

      <footer className="page-footer">
        <div className="copyright">
          <p>© 2022 What to watch Ltd.</p>
        </div>
      </footer>
    </div>
  </Fragment>;
};

export default ServerNotAvailable;
