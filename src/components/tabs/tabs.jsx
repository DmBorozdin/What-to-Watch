import React, {useState} from "react";
import PropTypes from "prop-types";
import filmProp from "../../common-props/film.js";
import reviewsProp from "../../common-props/reviews.js";
import {MovieNavItem} from "../../const";
import LoadingScreen from "../loading-screen/loading-screen.jsx";
import {getTimeInFormatHM, getDateInFormatMDY, getDateInFormatYMD} from "../../utils/common";

const Tabs = ({film, reviews, isReviewLoaded}) => {
  const [currentNavItem, setCurrentNavItem] = useState(MovieNavItem.OVERVIEW);
  const reviewsFormat = [reviews.slice(0, Math.ceil(reviews.length / 2)), reviews.slice(Math.ceil(reviews.length / 2))];

  const handleNavItemClick = (evt) => {
    evt.preventDefault();
    setCurrentNavItem(evt.target.dataset.navItem);
  };

  return <React.Fragment>
    <div className="movie-card__desc">
      <nav className="movie-nav movie-card__nav">
        <ul className="movie-nav__list">
          {Object.values(MovieNavItem).map((navItem) => {
            return <li className={`movie-nav__item ${navItem === currentNavItem ? `movie-nav__item--active` : ``}`} key={navItem}>
              <a href="#" className="movie-nav__link" onClick={handleNavItemClick} data-nav-item={navItem}>{navItem}</a>
            </li>;
          })}
        </ul>
      </nav>

      {currentNavItem === MovieNavItem.OVERVIEW &&
        <React.Fragment>
          <div className="movie-rating">
            <div className="movie-rating__score">{film.rating}</div>
            <p className="movie-rating__meta">
              <span className="movie-rating__level">Very good</span>
              <span className="movie-rating__count">{film.scoresCount} ratings</span>
            </p>
          </div>

          <div className="movie-card__text">
            <p style={{whiteSpace: `pre-line`}}>{film.description}</p>

            <p className="movie-card__director"><strong>Director: {film.director}</strong></p>

            <p className="movie-card__starring"><strong>Starring: {film.starring.join(`, `)}</strong></p>
          </div>
        </React.Fragment>
      }

      {currentNavItem === MovieNavItem.DETAILS &&
        <div className="movie-card__text movie-card__row">
          <div className="movie-card__text-col">
            <p className="movie-card__details-item">
              <strong className="movie-card__details-name">Director</strong>
              <span className="movie-card__details-value">{film.director}</span>
            </p>
            <p className="movie-card__details-item">
              <strong className="movie-card__details-name">Starring</strong>
              <span className="movie-card__details-value" style={{whiteSpace: `pre-line`}}>
                {film.starring.join(`, \n`)}
              </span>
            </p>
          </div>

          <div className="movie-card__text-col">
            <p className="movie-card__details-item">
              <strong className="movie-card__details-name">Run Time</strong>
              <span className="movie-card__details-value">{getTimeInFormatHM(film.runTime)} </span>
            </p>
            <p className="movie-card__details-item">
              <strong className="movie-card__details-name">Genre</strong>
              <span className="movie-card__details-value">{film.genre}</span>
            </p>
            <p className="movie-card__details-item">
              <strong className="movie-card__details-name">Released</strong>
              <span className="movie-card__details-value">{film.released}</span>
            </p>
          </div>
        </div>
      }

      {currentNavItem === MovieNavItem.REVIEWS &&
        <React.Fragment>
          {isReviewLoaded &&
            <div className="movie-card__reviews movie-card__row">
              {reviewsFormat.map((columnsReview, index) => (
                <div className="movie-card__reviews-col" key={`reviews-col ${index}`}>
                  {columnsReview.map((review) => (
                    <div className="review" key={`review ${review.id}`}>
                      <blockquote className="review__quote">
                        <p className="review__text">{review.comment}</p>

                        <footer className="review__details">
                          <cite className="review__author">{review.user.name}</cite>
                          <time className="review__date" dateTime={getDateInFormatYMD(review.date)}>{getDateInFormatMDY(review.date)}</time>
                        </footer>
                      </blockquote>

                      <div className="review__rating">{review.rating}</div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          }
          {!isReviewLoaded && <LoadingScreen/>}
        </React.Fragment>
      }
    </div>
  </React.Fragment>;
};

Tabs.propTypes = {
  film: filmProp,
  reviews: reviewsProp,
  isReviewLoaded: PropTypes.bool.isRequired,
};

export default Tabs;
