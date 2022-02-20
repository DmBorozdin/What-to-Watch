import React from "react";
import {Link, useHistory} from "react-router-dom";
import PropTypes from "prop-types";

const MovieCard = (props) => {
  const {film, setActiveCard} = props;

  const history = useHistory();

  const hadleMouseEnter = () => setActiveCard(film.id);
  const hadleMouseLeave = () => setActiveCard(null);
  const hadleLinkClick = (evt) => {
    evt.preventDefault();
    history.push(`/films/${film.id}`);
  };

  return (
    <article
      className="small-movie-card catalog__movies-card"
      onMouseEnter = {hadleMouseEnter}
      onMouseLeave = {hadleMouseLeave}
    >
      <div className="small-movie-card__image">
        <img src={film.previewImage} alt={film.name} width="280" height="175" />
      </div>
      <h3 className="small-movie-card__title">
        <Link
          className="small-movie-card__link"
          to="/films/:id}"
          onClick={hadleLinkClick}
        >
          {film.name}
        </Link>
      </h3>
    </article>
  );
};

MovieCard.propTypes = {
  film: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    previewImage: PropTypes.string.isRequired,
    genre: PropTypes.string.isRequired,
    released: PropTypes.number.isRequired,
    videoLink: PropTypes.string.isRequired,
  }).isRequired,
  setActiveCard: PropTypes.func,
};

export default MovieCard;
