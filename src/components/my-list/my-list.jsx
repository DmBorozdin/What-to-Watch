import React, {useEffect} from "react";
import {useSelector, useDispatch} from "react-redux";
import {Link} from "react-router-dom";
import MoviesList from "../movies-list/movies-list";
import {APPRoute} from "../../const.js";
import {logout, fetchFavoriteFilms} from "../../store/api-actions.js";
import LoadingScreen from "../loading-screen/loading-screen";
import {getFilmData} from "../../store/films-data/selectors";
import Logo from "../logo/logo";
import PageFooter from "../page-footer/page-footer";

const MyList = () => {
  const {favorite, isFavoriteFilmsLoaded} = useSelector(getFilmData);
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
        <Logo/>

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

      <PageFooter render={() => <Logo isFooter={true}/>}/>
    </div>
  );
};

export default MyList;
