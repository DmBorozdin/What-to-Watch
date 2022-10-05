import React, {useState} from "react";
import PropTypes from "prop-types";
import filmProp from "../../common-props/film.js";
import reviewsProp from "../../common-props/reviews.js";
import MovieOverview from "../movie-overview/movie-overview.jsx";
import MovieDetails from "../movie-details/movie-details.jsx";
import MovieReview from "../movie-review/movie-review.jsx";
import {MovieNavItem} from "../../const";

const Tabs = ({film, reviews, isReviewLoaded}) => {
  const [currentNavItem, setCurrentNavItem] = useState(MovieNavItem.OVERVIEW);

  const handleNavItemClick = (evt) => {
    evt.preventDefault();
    setCurrentNavItem(evt.target.dataset.navItem);
  };

  const renderActiveTab = () => {
    switch (currentNavItem) {
      case MovieNavItem.DETAILS:
        return <MovieDetails film={film}/>;
      case MovieNavItem.REVIEWS:
        return <MovieReview reviews={reviews} isReviewLoaded={isReviewLoaded}/>;
    }
    return <MovieOverview film={film}/>;
  };

  return (
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
      {renderActiveTab()}
    </div>
  );
};

Tabs.propTypes = {
  film: filmProp,
  reviews: reviewsProp,
  isReviewLoaded: PropTypes.bool.isRequired,
};

export default Tabs;
