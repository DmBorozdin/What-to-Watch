import React from "react";
import PropTypes from "prop-types";
import reviewsProp from "../../common-props/reviews.js";
import {getDateInFormatMDY, getDateInFormatYMD, formatReviews} from "../../utils/common";

const MovieReview = ({reviews, isReviewLoaded}) => {
  const formatedReviews = formatReviews(reviews);
  return (isReviewLoaded &&
    <div className="movie-card__reviews movie-card__row">
      {formatedReviews.map((columnsReview, index) => (
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
  );
};

MovieReview.propTypes = {
  reviews: reviewsProp,
  isReviewLoaded: PropTypes.bool.isRequired,
};

export default MovieReview;
