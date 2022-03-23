import React, {useEffect} from "react";
import {useHistory} from "react-router-dom";
import {connect} from "react-redux";
import {ActionCreator} from "../../store/action";
import MoviesList from "../movies-list/movies-list";
import PropTypes from "prop-types";
import filmProp from "../../common-props/film.js";
import GenreList from "../genre-list/genre-list";
import {Genre} from "../../const";

const Main = ({titleMovie, films, filter, onUserGenreClick, onResetFilmList}) => {
  const history = useHistory();

  const handleSignInClick = () => {
    history.push(`/login`);
  };

  useEffect(() => {
    onResetFilmList();
  }, []);

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

        <GenreList films={films} activeGenre={filter.genre} onGenreClick={onUserGenreClick}/>

        <MoviesList films={filter.films} autoPlay={true}/>

        <div className="catalog__more">
          <button className="catalog__button" type="button">Show more</button>
        </div>
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
  filter: PropTypes.shape({
    genre: PropTypes.string.isRequired,
    films: PropTypes.arrayOf(filmProp).isRequired,
  }).isRequired,
  onUserGenreClick: PropTypes.func.isRequired,
  onResetFilmList: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  films: state.films,
  filter: state.filter,
});

const mapDispatchToProps = (dispatch) => ({
  onUserGenreClick(genre) {
    dispatch(genre !== Genre.ALL_GENRE ? ActionCreator.changeGenre(genre) : ActionCreator.resetFilmsList());
  },
  onResetFilmList() {
    dispatch(ActionCreator.resetFilmsList());
  },
});

export {Main};
export default connect(mapStateToProps, mapDispatchToProps)(Main);
