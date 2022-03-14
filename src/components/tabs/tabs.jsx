import React, {useState} from "react";
import tabsProp from "./tabs.prop";
import {MovieNavItem} from "../../const";

const Tabs = ({film}) => {
  const [currentNavItem, setCurrentNavItem] = useState(MovieNavItem.OVERVIEW);

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
    </div>
  </React.Fragment>;
};

Tabs.propTypes = {
  film: tabsProp,
};

export default Tabs;
