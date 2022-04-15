import React from "react";
import PropTypes from "prop-types";
import UserBlock from "../user-block/user-block";

const TitleMovieCard = ({titleMovie, avatarUrl, authorizationStatus, onUserAvatarClick}) => {
  return (
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

        <UserBlock avatarUrl={avatarUrl} authorizationStatus={authorizationStatus} onUserAvatarClick={onUserAvatarClick}/>
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
  );
};

TitleMovieCard.propTypes = {
  titleMovie: PropTypes.shape({
    title: PropTypes.string.isRequired,
    genre: PropTypes.string.isRequired,
    year: PropTypes.string.isRequired,
  }).isRequired,
  avatarUrl: PropTypes.string.isRequired,
  authorizationStatus: PropTypes.string.isRequired,
  onUserAvatarClick: PropTypes.func.isRequired,
};

export default React.memo(TitleMovieCard, (prevProps, nextProps) => {
  return prevProps.authorizationStatus === nextProps.authorizationStatus &&
    prevProps.avatarUrl === nextProps.avatarUrl &&
    prevProps.titleMovie === prevProps.titleMovie;
});
