import React, {useEffect} from "react";
import {useSelector, useDispatch} from "react-redux";
import {changeGenre, resetFilmsList, redirectToRoute} from "../../store/action";
import MoviesList from "../movies-list/movies-list";
import GenreList from "../genre-list/genre-list";
import ShowMore from "../show-more/show-more";
import {filterFilmsByGenre} from "../../film";
import {FILM_CARD_PER_STEP, APPRoute} from "../../const";
import LoadingScreen from "../loading-screen/loading-screen";
import {fetchFilmList} from "../../store/api-actions";
import TitleMovieCard from "../title-movie-card/title-movie-card";
import {useShownsCards} from "../../hooks/use-showns-cards";

const Main = () => {
  const {films, titleMovie, authInfo, isDataLoaded} = useSelector((state) => state.DATA);
  const {selectedGenre} = useSelector((state) => state.LIST);
  const {authorizationStatus} = useSelector((state) => state.USER);
  const [shownsCardsCount, handleResetShownsCardsCount, handleSetShownsCardsCount] = useShownsCards(FILM_CARD_PER_STEP);
  let filteredFilms = filterFilmsByGenre(films, selectedGenre);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!isDataLoaded) {
      dispatch(fetchFilmList());
    }
  }, [isDataLoaded]);

  useEffect(() => {
    dispatch(resetFilmsList());
  }, []);

  useEffect(() => {
    handleResetShownsCardsCount();
    filteredFilms = filterFilmsByGenre(films, selectedGenre);
  }, [selectedGenre]);

  if (!isDataLoaded) {
    return (<LoadingScreen/>);
  }

  const onUserGenreClick = (genre) => {
    dispatch(changeGenre(genre));
  };

  const onUserAvatarClick = () => {
    dispatch(redirectToRoute(APPRoute.MYLIST));
  };

  return <React.Fragment>
    <TitleMovieCard titleMovie={titleMovie} avatarUrl={authInfo.avatarUrl} authorizationStatus={authorizationStatus} onUserAvatarClick={onUserAvatarClick}/>

    <div className="page-content">
      <section className="catalog">
        <h2 className="catalog__title visually-hidden">Catalog</h2>

        {films.length > 0 && <GenreList films={films} activeGenre={selectedGenre} onGenreClick={onUserGenreClick}/>}

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
