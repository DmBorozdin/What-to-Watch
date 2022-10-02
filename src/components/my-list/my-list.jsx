import React, {useEffect} from "react";
import {useSelector, useDispatch} from "react-redux";
import {Link} from "react-router-dom";
import MoviesList from "../movies-list/movies-list";
import {APPRoute} from "../../const.js";
import {logout, fetchFavoriteFilms} from "../../store/api-actions.js";
import LoadingScreen from "../loading-screen/loading-screen";

const MyList = () => {
  const {favorite, isFavoriteFilmsLoaded} = useSelector((state) => state.DATA);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!isFavoriteFilmsLoaded) {
      dispatch(fetchFavoriteFilms());
    }
  }, [isFavoriteFilmsLoaded]);

  const handleLogOut = () => {
    dispatch(logout());
  };

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
          <Link to={APPRoute.MAIN} className="user-block__link" onClick={handleLogOut}>Log out</Link>
        </div>
      </header>

      <section className="catalog">
        <h2 className="catalog__title visually-hidden">Catalog</h2>
        {!isFavoriteFilmsLoaded && <LoadingScreen/>}
        {isFavoriteFilmsLoaded && <MoviesList films={favorite} autoPlay={false}/>}
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

export default MyList;
