import React, {useEffect, useState} from "react";
import {useHistory} from "react-router-dom";
import {connect} from "react-redux";
import {ActionCreator} from "../../store/action";
import MoviesList from "../movies-list/movies-list";
import PropTypes from "prop-types";
import filmProp from "../../common-props/film.js";
import GenreList from "../genre-list/genre-list";
import ShowMore from "../show-more/show-more";
import {filterFilmsByGenre} from "../../film";
import {FILM_CARD_PER_STEP} from "../../const";
import LoadingScreen from "../loading-screen/loading-screen";
import {fetchFilmList} from "../../store/api-actions";

const Main = ({titleMovie, films, selectedGenre, filteredFilms, onUserGenreClick, onResetFilmList, isDataLoaded, onLoadData}) => {
  const history = useHistory();
  const [shownsCardsCount, setShownsCardsCount] = useState(FILM_CARD_PER_STEP);

  useEffect(() => {
    if (!isDataLoaded) {
      onLoadData();
    }
  }, [isDataLoaded]);

  const handleSignInClick = () => {
    history.push(`/login`);
  };

  useEffect(() => {
    onResetFilmList();
  }, []);

  useEffect(() => {
    if (shownsCardsCount !== FILM_CARD_PER_STEP) {
      setShownsCardsCount(FILM_CARD_PER_STEP);
    }
  }, [selectedGenre]);

  if (!isDataLoaded) {
    return (<LoadingScreen/>);
  }

  return <React.Fragment>
    <section className="movie-card">
      <div className="movie-card__bg">
        <img src="img/bg-the-grand-budapest-hotel.jpg" alt="The Grand Budapest Hotel" />
      </div>

      <h1 className="visually-hidden">WTW</h1>

      <header className="page-header movie-card__head">
        <div className="logo">
          <a className="logo__link">
            <span className="logo__letter logo__letter--1">W</span>
            <span className="logo__letter logo__letter--2">T</span>
            <span className="logo__letter logo__letter--3">W</span>
          </a>
        </div>

        <div className="user-block">
          <div className="user-block__avatar" onClick={handleSignInClick}>
            <img src="img/avatar.jpg" alt="User avatar" width="63" height="63" />
          </div>
        </div>
      </header>

      <div className="movie-card__wrap">
        <div className="movie-card__info">
          <div className="movie-card__poster">
            <img src="img/the-grand-budapest-hotel-poster.jpg" alt="The Grand Budapest Hotel poster" width="218" height="327" />
          </div>

          <div className="movie-card__desc">
            <h2 className="movie-card__title">{titleMovie.title}</h2>
            <p className="movie-card__meta">
              <span className="movie-card__genre">{titleMovie.genre}</span>
              <span className="movie-card__year">{titleMovie.year}</span>
            </p>

            <div className="movie-card__buttons">
              <button className="btn btn--play movie-card__button" type="button">
                <svg viewBox="0 0 19 19" width="19" height="19">
                  <use xlinkHref="#play-s"></use>
                </svg>
                <span>Play</span>
              </button>
              <button className="btn btn--list movie-card__button" type="button">
                <svg viewBox="0 0 19 20" width="19" height="20">
                  <use xlinkHref="#add"></use>
                </svg>
                <span>My list</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <div className="page-content">
      <section className="catalog">
        <h2 className="catalog__title visually-hidden">Catalog</h2>

        {films.length > 0 && <GenreList films={films} activeGenre={selectedGenre} onGenreClick={onUserGenreClick}/>}

        <MoviesList films={filteredFilms.slice(0, shownsCardsCount)} autoPlay={true}/>

        {filteredFilms.length > shownsCardsCount && <ShowMore onShowMore={() => setShownsCardsCount(shownsCardsCount + FILM_CARD_PER_STEP)}/>}
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

Main.propTypes = {
  titleMovie: PropTypes.shape({
    title: PropTypes.string.isRequired,
    genre: PropTypes.string.isRequired,
    year: PropTypes.string.isRequired,
  }).isRequired,
  films: PropTypes.arrayOf(filmProp).isRequired,
  selectedGenre: PropTypes.string.isRequired,
  filteredFilms: PropTypes.arrayOf(filmProp).isRequired,
  onUserGenreClick: PropTypes.func.isRequired,
  onResetFilmList: PropTypes.func.isRequired,
  isDataLoaded: PropTypes.bool.isRequired,
  onLoadData: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  films: state.films,
  selectedGenre: state.selectedGenre,
  filteredFilms: filterFilmsByGenre(state.films, state.selectedGenre),
  titleMovie: state.titleMovie,
  isDataLoaded: state.isDataLoaded,
});

const mapDispatchToProps = (dispatch) => ({
  onUserGenreClick(films, genre) {
    dispatch(ActionCreator.changeGenre(genre));
  },
  onResetFilmList() {
    dispatch(ActionCreator.resetFilmsList());
  },
  onLoadData() {
    dispatch(fetchFilmList());
  },
});

export {Main};
export default connect(mapStateToProps, mapDispatchToProps)(Main);
