import React, {useEffect} from "react";
import {useSelector, useDispatch} from "react-redux";
import {changeGenre, resetFilmsList, redirectToRoute} from "../../store/action";
import MoviesList from "../movies-list/movies-list";
import GenreList from "../genre-list/genre-list";
import ShowMore from "../show-more/show-more";
import {FILM_CARD_PER_STEP, APPRoute} from "../../const";
import LoadingScreen from "../loading-screen/loading-screen";
import {fetchFilmList, fetchPromoFilm} from "../../store/api-actions";
import TitleMovieCard from "../title-movie-card/title-movie-card";
import {useShownsCards} from "../../hooks/use-showns-cards";
import {filterFilmsByGenre} from "../../store/films-data/selectors";
import {chooseGenre} from "../../store/films-list/selectors";

const Main = () => {
  const {promoFilm, authInfo, isDataLoaded, isPromoFilmLoaded} = useSelector((state) => state.DATA);
  const {selectedGenre} = useSelector((state) => state.LIST);
  const {authorizationStatus} = useSelector((state) => state.USER);
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
    dispatch(resetFilmsList());
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

  const onUserAvatarClick = () => {
    dispatch(redirectToRoute(APPRoute.MYLIST));
  };

  return <React.Fragment>
    <TitleMovieCard promoFilm={promoFilm} avatarUrl={authInfo.avatarUrl} authorizationStatus={authorizationStatus} onUserAvatarClick={onUserAvatarClick}/>

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
  </React.Fragment>;
};

export default Main;
