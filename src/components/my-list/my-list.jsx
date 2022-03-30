import React from "react";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import filmProp from "../../common-props/film.js";
import {Link} from "react-router-dom";
import MoviesList from "../movies-list/movies-list";
import {APPRoute} from "../../const.js";

const MyList = ({myListFilms}) => {
  return (
    <div className="user-page">
      <header className="page-header user-page__head">
        <div className="logo">
          <Link to={APPRoute.MAIN} className="logo__link">
            <span className="logo__letter logo__letter--1">W</span>
            <span className="logo__letter logo__letter--2">T</span>
            <span className="logo__letter logo__letter--3">W</span>
          </Link>
        </div>

        <h1 className="page-title user-page__title">My list</h1>

        <div className="user-block">
          <div className="user-block__avatar">
            <img src="img/avatar.jpg" alt="User avatar" width="63" height="63" />
          </div>
        </div>
      </header>

      <section className="catalog">
        <h2 className="catalog__title visually-hidden">Catalog</h2>

        <MoviesList films={myListFilms} autoPlay={false}/>
      </section>

      <footer className="page-footer">
        <div className="logo">
          <Link to={APPRoute.MAIN} className="logo__link logo__link--light">
            <span className="logo__letter logo__letter--1">W</span>
            <span className="logo__letter logo__letter--2">T</span>
            <span className="logo__letter logo__letter--3">W</span>
          </Link>
        </div>

        <div className="copyright">
          <p>© 2022 What to watch Ltd.</p>
        </div>
      </footer>
    </div>
  );
};

MyList.propTypes = {
  myListFilms: PropTypes.arrayOf(filmProp).isRequired,
};

const mapStateToProps = (state) => ({
  myListFilms: state.films,
});

export {MyList};
export default connect(mapStateToProps, null)(MyList);
