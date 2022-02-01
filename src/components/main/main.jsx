import React from "react";
import PropTypes from "prop-types";
import MovieCard from "../movie-card/movie-card";

const Main = (props) => {
  const {titleMovie} = props;
  const MoviesList = [
    {img: `img/fantastic-beasts-the-crimes-of-grindelwald.jpg`, movieTitle: `Fantastic Beasts: The Crimes of Grindelwald`},
    {img: `img/bohemian-rhapsody.jpg`, movieTitle: `Bohemian Rhapsody`},
    {img: `img/macbeth.jpg`, movieTitle: `Macbeth`},
    {img: `img/aviator.jpg`, movieTitle: `Aviator`},
    {img: `img/we-need-to-talk-about-kevin.jpg`, movieTitle: `We need to talk about Kevin`},
    {img: `img/what-we-do-in-the-shadows.jpg`, movieTitle: `What We Do in the Shadows`},
    {img: `img/revenant.jpg`, movieTitle: `Revenant`},
    {img: `img/johnny-english.jpg`, movieTitle: `Johnny English`},
    {img: `img/shutter-island.jpg`, movieTitle: `Shutter Island`},
    {img: `img/pulp-fiction.jpg`, movieTitle: `Pulp Fiction`},
    {img: `img/no-country-for-old-men.jpg`, movieTitle: `No Country for Old Men`},
    {img: `img/snatch.jpg`, movieTitle: `Snatch`},
    {img: `img/moonrise-kingdom.jpg`, movieTitle: `Moonrise Kingdom`},
    {img: `img/seven-years-in-tibet.jpg`, movieTitle: `Seven Years in Tibet`},
    {img: `img/midnight-special.jpg`, movieTitle: `Midnight Special`},
    {img: `img/war-of-the-worlds.jpg`, movieTitle: `War of the Worlds`},
    {img: `img/dardjeeling-limited.jpg`, movieTitle: `Dardjeeling Limited`},
    {img: `img/orlando.jpg`, movieTitle: `Orlando`},
    {img: `img/mindhunter.jpg`, movieTitle: `Mindhunter`},
    {img: `img/midnight-special.jpg`, movieTitle: `Midnight Special`},
  ];

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
          <div className="user-block__avatar">
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

        <ul className="catalog__genres-list">
          <li className="catalog__genres-item catalog__genres-item--active">
            <a href="#" className="catalog__genres-link">All genres</a>
          </li>
          <li className="catalog__genres-item">
            <a href="#" className="catalog__genres-link">Comedies</a>
          </li>
          <li className="catalog__genres-item">
            <a href="#" className="catalog__genres-link">Crime</a>
          </li>
          <li className="catalog__genres-item">
            <a href="#" className="catalog__genres-link">Documentary</a>
          </li>
          <li className="catalog__genres-item">
            <a href="#" className="catalog__genres-link">Dramas</a>
          </li>
          <li className="catalog__genres-item">
            <a href="#" className="catalog__genres-link">Horror</a>
          </li>
          <li className="catalog__genres-item">
            <a href="#" className="catalog__genres-link">Kids & Family</a>
          </li>
          <li className="catalog__genres-item">
            <a href="#" className="catalog__genres-link">Romance</a>
          </li>
          <li className="catalog__genres-item">
            <a href="#" className="catalog__genres-link">Sci-Fi</a>
          </li>
          <li className="catalog__genres-item">
            <a href="#" className="catalog__genres-link">Thrillers</a>
          </li>
        </ul>

        <div className="catalog__movies-list">
          {MoviesList.map((movie, i) => <MovieCard key = {movie.movieTitle + i} movie = {movie}/>)}
        </div>

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
          <p>© 2019 What to watch Ltd.</p>
        </div>
      </footer>
    </div>
  </React.Fragment>;
};

Main.propTypes = {
  titleMovie: PropTypes.object.isRequired,
};

export default Main;
