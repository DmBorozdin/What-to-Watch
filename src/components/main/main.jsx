import React, {Fragment, useEffect} from "react";
import {useSelector, useDispatch} from "react-redux";
import {changeGenre, resetFilmsList} from "../../store/action";
import MoviesList from "../movies-list/movies-list";
import GenreList from "../genre-list/genre-list";
import ShowMore from "../show-more/show-more";
import {FILM_CARD_PER_STEP, Genre} from "../../const";
import LoadingScreen from "../loading-screen/loading-screen";
import {fetchFilmList, fetchPromoFilm} from "../../store/api-actions";
import TitleMovieCard from "../title-movie-card/title-movie-card";
import {useShownsCards} from "../../hooks/use-showns-cards";
import {filterFilmsByGenre, getFilmData} from "../../store/films-data/selectors";
import {chooseGenre, getFilmList} from "../../store/films-list/selectors";
import {getUserData} from "../../store/user/selectors";

const Main = () => {
  const {promoFilm, authInfo, isDataLoaded, isPromoFilmLoaded} = useSelector(getFilmData);
  const {selectedGenre} = useSelector(getFilmList);
  const {authorizationStatus} = useSelector(getUserData);
  const [shownsCardsCount, handleResetShownsCardsCount, handleSetShownsCardsCount] = useShownsCards(FILM_CARD_PER_STEP);
  const filteredFilms = useSelector(filterFilmsByGenre);
  const genreList = useSelector(chooseGenre);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!isDataLoaded) {
      dispatch(fetchFilmList());
    }
  }, [isDataLoaded]);

  useEffect(() => {
    if (!isPromoFilmLoaded) {
      dispatch(fetchPromoFilm());
    }
  }, [isPromoFilmLoaded]);

  useEffect(() => {
    if (selectedGenre !== Genre.ALL_GENRE) {
      dispatch(resetFilmsList());
    }
  }, []);

  useEffect(() => {
    handleResetShownsCardsCount();
  }, [selectedGenre]);

  if (!isDataLoaded || !isPromoFilmLoaded) {
    return (<LoadingScreen/>);
  }

  const onUserGenreClick = (genre) => {
    dispatch(changeGenre(genre));
  };

  return <Fragment>
    <TitleMovieCard promoFilm={promoFilm} avatarUrl={authInfo.avatarUrl} authorizationStatus={authorizationStatus}/>

    <div className="page-content">
      <section className="catalog">
        <h2 className="catalog__title visually-hidden">Catalog</h2>
        {genreList.length > 1 && <GenreList genreList={genreList} activeGenre={selectedGenre} onGenreClick={onUserGenreClick}/>}
        <MoviesList films={filteredFilms.slice(0, shownsCardsCount)} autoPlay={true}/>
        {filteredFilms.length > shownsCardsCount && <ShowMore onShowMore={handleSetShownsCardsCount}/>}
      </section>

      <footer className="page-footer">
        <div className="logo">
          <a className="logo__link logo__link--light">
            <span className="logo__letter logo__letter--1">W</span>
            <span className="logo__letter logo__letter--2">T</span>
            <span className="logo__letter logo__letter--3">W</span>
          </a>
        </div>

        <div className="copyright">
          <p>© 2022 What to watch Ltd.</p>
        </div>
      </footer>
    </div>
  </Fragment>;
};

export default Main;
