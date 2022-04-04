import React, {useEffect} from "react";
import {Link, useParams} from "react-router-dom";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {ActionCreator} from "../../store/action.js";
import filmProp from "../../common-props/film.js";
import reviewsProp from "../../common-props/reviews.js";
import Tabs from "../tabs/tabs.jsx";
import MoviesList from "../movies-list/movies-list.jsx";
import {shuffleArray} from "../../utils/common.js";
import {COUNT_SIMILAR_FILM_CARD, APPRoute, AuthorizationStatus} from "../../const.js";
import UserBlock from "../user-block/user-block.jsx";
import authInfoProp from "../../common-props/auth-info";
import {fetchFilm, fetchComment} from "../../store/api-actions.js";
import LoadingScreen from "../loading-screen/loading-screen.jsx";

const Film = ({films, reviews, authInfo, authorizationStatus, onRedirect, onLoadData, onLoadReviews, isOneFilmLoaded, isReviewLoaded, onResetReview}) => {
  const pageId = Number(useParams().id);

  useEffect(() => {
    onResetReview();
  }, []);

  useEffect(() => {
    if (!isOneFilmLoaded) {
      onLoadData(pageId);
    }
  }, [isOneFilmLoaded]);

  useEffect(() => {
    if (!isReviewLoaded) {
      onLoadReviews(pageId);
    }
  }, [isReviewLoaded]);

  const film = films.find((item) => item.id === pageId);
  const similarFilms = shuffleArray(films.filter((similarFilm) => similarFilm.id !== film.id && similarFilm.genre === film.genre)).slice(0, COUNT_SIMILAR_FILM_CARD);

  const handlePlayClick = () => onRedirect(`${APPRoute.PLAYER}/${film.id}`);

  const handleAvatarClick = () => onRedirect(APPRoute.MYLIST);

  if (!isOneFilmLoaded || !isReviewLoaded) {
    return (<LoadingScreen/>);
  }

  return <React.Fragment>
    <section className="movie-card movie-card--full">
      <div className="movie-card__hero">
        <div className="movie-card__bg">
          <img src="img/bg-the-grand-budapest-hotel.jpg" alt="The Grand Budapest Hotel" />
        </div>

        <h1 className="visually-hidden">WTW</h1>

        <header className="page-header movie-card__head">
          <div className="logo">
            <Link to={APPRoute.MAIN} className="logo__link">
              <span className="logo__letter logo__letter--1">W</span>
              <span className="logo__letter logo__letter--2">T</span>
              <span className="logo__letter logo__letter--3">W</span>
            </Link>
          </div>

          <UserBlock avatarUrl={authInfo.avatarUrl} authorizationStatus={authorizationStatus} onUserAvatarClick={handleAvatarClick}/>
        </header>

        <div className="movie-card__wrap">
          <div className="movie-card__desc">
            <h2 className="movie-card__title">{film.name}</h2>
            <p className="movie-card__meta">
              <span className="movie-card__genre">{film.genre}</span>
              <span className="movie-card__year">{film.released}</span>
            </p>

            <div className="movie-card__buttons">
              <button className="btn btn--play movie-card__button" type="button" onClick={handlePlayClick}>
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
              {authorizationStatus === AuthorizationStatus.AUTH && <Link to={`${APPRoute.FILMS}/${film.id}${APPRoute.REVIEW}`} className="btn movie-card__button">Add review</Link>}
            </div>
          </div>
        </div>
      </div>

      <div className="movie-card__wrap movie-card__translate-top">
        <div className="movie-card__info">
          <div className="movie-card__poster movie-card__poster--big">
            <img src={film.posterImage} alt={`${film.name} poster`} width="218" height="327" />
          </div>

          <Tabs film={film} reviews={reviews}/>
        </div>
      </div>
    </section>

    <div className="page-content">
      {similarFilms.length !== 0 &&
        <section className="catalog catalog--like-this">
          <h2 className="catalog__title">More like this</h2>

          <MoviesList films={similarFilms} autoPlay={false}/>
        </section>
      }

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
  </React.Fragment>;
};

Film.propTypes = {
  films: PropTypes.arrayOf(filmProp).isRequired,
  reviews: reviewsProp,
  authInfo: authInfoProp,
  onRedirect: PropTypes.func.isRequired,
  authorizationStatus: PropTypes.string.isRequired,
  onLoadData: PropTypes.func.isRequired,
  isOneFilmLoaded: PropTypes.bool.isRequired,
  isReviewLoaded: PropTypes.bool.isRequired,
  onLoadReviews: PropTypes.func.isRequired,
  onResetReview: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  films: state.films,
  reviews: state.reviews,
  authInfo: state.authInfo,
  authorizationStatus: state.authorizationStatus,
  isOneFilmLoaded: state.isOneFilmLoaded,
  isReviewLoaded: state.isReviewLoaded,
});

const mapDispatchToProps = (dispatch) => ({
  onLoadData(pageId) {
    dispatch(fetchFilm(pageId));
  },
  onLoadReviews(pageId) {
    dispatch(fetchComment(pageId));
  },
  onRedirect(url) {
    dispatch(ActionCreator.redirectToRoute(url));
  },
  onResetReview() {
    dispatch(ActionCreator.resetReview());
  },
});

export {Film};
export default connect(mapStateToProps, mapDispatchToProps)(Film);
