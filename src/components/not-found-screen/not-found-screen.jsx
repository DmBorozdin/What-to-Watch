import React from "react";
import {Link} from "react-router-dom";

const NotFoundScreen = () => {
  return <React.Fragment>
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

      <div className="user-page__content" style={{textAlign: `center`}}>
        <h1>404. Page not found</h1>
        <Link to="/">Вернуться на главную страницу</Link>
      </div>

      <footer className="page-footer">
        <div className="copyright">
          <p>© 2022 What to watch Ltd.</p>
        </div>
      </footer>
    </div>
  </React.Fragment>;
};

export default NotFoundScreen;
