import React, {Fragment} from "react";
import filmProp from "../../common-props/film";
import {getAssessmentDescription} from "../../utils/common";

const MovieOverview = ({film}) => {
  const assessmentDescription = getAssessmentDescription(film.rating);
  return (
    <Fragment>
      <div className="movie-rating">
        <div className="movie-rating__score">{film.rating}</div>
        <p className="movie-rating__meta">
          <span className="movie-rating__level">{assessmentDescription}</span>
          <span className="movie-rating__count">{`${film.scoresCount} ratings`}</span>
        </p>
      </div>

      <div className="movie-card__text">
        <p style={{whiteSpace: `pre-line`}}>{film.description}</p>
        <p className="movie-card__director"><strong>{`Director: ${film.director}`}</strong></p>
        <p className="movie-card__starring"><strong>{`Starring: ${film.starring.join(`, `)}`}</strong></p>
      </div>
    </Fragment>
  );
};

MovieOverview.propTypes = {
  film: filmProp,
};

export default MovieOverview;
