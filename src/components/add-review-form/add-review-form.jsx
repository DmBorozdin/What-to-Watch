import React, {useState, useEffect, useRef, Fragment} from "react";
import PropTypes from "prop-types";
import {ReviewFormType, ReviewValidation, ReviewFormStatus, ratingStars} from "../../const";

const AddReviewForm = ({onSubmit, pageId, reviewFormStatus}) => {
  const [review, setReview] = useState({
    rating: 0,
    comment: ``,
    isFormValid: false,
    isRatingValid: true,
  });
  const formRef = useRef();

  useEffect(() => {
    if (review.rating > 0 &&
        review.comment.length >= ReviewValidation.MIN_TEXT_LENGTH &&
        review.comment.length <= ReviewValidation.MAX_TEXT_LENGTH
    ) {
      setReview({
        ...review,
        isFormValid: true,
      });
      return;
    }

    setReview({
      ...review,
      isFormValid: false,
    });
  }, [review.rating, review.comment]);

  const handleAddReview = (evt) => {
    switch (evt.target.tagName) {
      case ReviewFormType.INPUT:
        setReview({
          ...review,
          rating: evt.target.value,
          isRatingValid: true,
        });
        break;
      case ReviewFormType.TEXTAREA:
        if (evt.target.validity.tooShort) {
          evt.target.setCustomValidity(`Введите еще ${ReviewValidation.MIN_TEXT_LENGTH - evt.target.value.length} симв.`);
        } else if (evt.target.validity.tooLong) {
          evt.target.setCustomValidity(`Удалите лишние ${evt.target.value.length - ReviewValidation.MAX_TEXT_LENGTH} симв.`);
        } else {
          evt.target.setCustomValidity(``);
        }
        evt.target.reportValidity();

        if (review.rating === 0) {
          setReview({
            ...review,
            comment: evt.target.value,
            isRatingValid: false,
          });
          return;
        }

        setReview({
          ...review,
          comment: evt.target.value,
        });
        break;
    }
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();

    onSubmit({
      rating: review.rating,
      comment: review.comment,
      id: pageId,
    });
  };

  return (
    <form
      ref={formRef}
      action="#"
      className="add-review__form"
      onChange={handleAddReview}
      onSubmit={handleSubmit}
    >
      <fieldset className="add-review__fieldset" disabled={reviewFormStatus === ReviewFormStatus.DISABLE}>
        <div className="rating">
          <div className="rating__stars">
            {ratingStars.map((starNumber) =>
              <Fragment key={`star ${starNumber}`}>
                <input
                  className="rating__input"
                  id={`star-${starNumber}`}
                  type="radio" name="rating"
                  value={starNumber} required
                />
                <label className="rating__label" htmlFor={`star-${starNumber}`}>{`star-${starNumber}`}</label>
              </Fragment>
            )}
          </div>
          {!review.isRatingValid && <p className="rating__error-message">Выберите оценку фильму от 1 до 10</p>}
        </div>

        <div className="add-review__text">
          <textarea
            className="add-review__textarea"
            name="rating-text"
            id="rating-text"
            placeholder="Review text"
            minLength={50}
            maxLength={400}
            required
          ></textarea>
          <div className="add-review__submit">
            <button className="add-review__btn" type="submit" disabled={!review.isFormValid}>Post</button>
          </div>
        </div>
      </fieldset>
    </form>
  );
};

AddReviewForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  pageId: PropTypes.number.isRequired,
  reviewFormStatus: PropTypes.string.isRequired,
};

export default AddReviewForm;
