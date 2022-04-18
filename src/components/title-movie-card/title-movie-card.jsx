import React from "react";
import {useDispatch} from "react-redux";
import {redirectToRoute} from "../../store/action";
import PropTypes from "prop-types";
import UserBlock from "../user-block/user-block";
import filmProp from "../../common-props/film";
import {APPRoute} from "../../const";
import {sendFavoriteStatus} from "../../store/api-actions";

const TitleMovieCard = ({promoFilm, avatarUrl, authorizationStatus, onUserAvatarClick}) => {
  const dispatch = useDispatch();

  const handlePlayClick = () => dispatch(redirectToRoute(`${APPRoute.PLAYER}/${promoFilm.id}`));

  const handleAddToFavoriteClick = () => dispatch(sendFavoriteStatus(promoFilm.id, Number(!promoFilm.isFavorite)));

  return (
    <section className="movie-card">
      <div className="movie-card__bg">
        <img src={promoFilm.backgroundImage} alt={promoFilm.name} />
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
            <img src={promoFilm.posterImage} alt={`${promoFilm.name} poster`} width="218" height="327" />
          </div>

          <div className="movie-card__desc">
            <h2 className="movie-card__title">{promoFilm.name}</h2>
            <p className="movie-card__meta">
              <span className="movie-card__genre">{promoFilm.genre}</span>
              <span className="movie-card__year">{promoFilm.released}</span>
            </p>

            <div className="movie-card__buttons">
              <button className="btn btn--play movie-card__button" type="button" onClick={handlePlayClick}>
                <svg viewBox="0 0 19 19" width="19" height="19">
                  <use xlinkHref="#play-s"></use>
                </svg>
                <span>Play</span>
              </button>
              <button className="btn btn--list movie-card__button" type="button" onClick={handleAddToFavoriteClick}>
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
  promoFilm: filmProp,
  avatarUrl: PropTypes.string.isRequired,
  authorizationStatus: PropTypes.string.isRequired,
  onUserAvatarClick: PropTypes.func.isRequired,
};

export default React.memo(TitleMovieCard, (prevProps, nextProps) => {
  return prevProps.authorizationStatus === nextProps.authorizationStatus &&
    prevProps.avatarUrl === nextProps.avatarUrl &&
    prevProps.titleMovie === prevProps.titleMovie;
});
