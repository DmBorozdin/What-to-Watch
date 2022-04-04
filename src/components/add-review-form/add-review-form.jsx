import React, {useState, useRef} from "react";
import PropTypes from "prop-types";
import {ReviewFormType} from "../../const";

const AddReviewForm = ({onSubmit, pageId}) => {
  const commentRef = useRef();

  const [rating, setRating] = useState(10);

  const handleAddReview = (evt) => {
    if (evt.target.tagName === ReviewFormType.INPUT) {
      setRating(evt.target.value);
    }
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();

    onSubmit({
      rating,
      comment: commentRef.current.value,
      id: pageId,
    });
  };

  return <form action="#" className="add-review__form" onChange={handleAddReview} onSubmit={handleSubmit}>
    <div className="rating">
      <div className="rating__stars">
        <input className="rating__input" id="star-1" type="radio" name="rating" value="1"/>
        <label className="rating__label" htmlFor="star-1">Rating 1</label>

        <input className="rating__input" id="star-2" type="radio" name="rating" value="2" />
        <label className="rating__label" htmlFor="star-2">Rating 2</label>

        <input className="rating__input" id="star-3" type="radio" name="rating" value="3" />
        <label className="rating__label" htmlFor="star-3">Rating 3</label>

        <input className="rating__input" id="star-4" type="radio" name="rating" value="4" />
        <label className="rating__label" htmlFor="star-4">Rating 4</label>

        <input className="rating__input" id="star-5" type="radio" name="rating" value="5" />
        <label className="rating__label" htmlFor="star-5">Rating 5</label>

        <input className="rating__input" id="star-6" type="radio" name="rating" value="6"/>
        <label className="rating__label" htmlFor="star-6">Rating 6</label>

        <input className="rating__input" id="star-7" type="radio" name="rating" value="7" />
        <label className="rating__label" htmlFor="star-7">Rating 7</label>

        <input className="rating__input" id="star-8" type="radio" name="rating" value="8" />
        <label className="rating__label" htmlFor="star-8">Rating 8</label>

        <input className="rating__input" id="star-9" type="radio" name="rating" value="9" />
        <label className="rating__label" htmlFor="star-9">Rating 9</label>

        <input className="rating__input" id="star-10" type="radio" name="rating" value="10" defaultChecked />
        <label className="rating__label" htmlFor="star-10">Rating 10</label>
      </div>
    </div>

    <div className="add-review__text">
      <textarea ref={commentRef} className="add-review__textarea" name="rating-text" id="rating-text" placeholder="Review text"></textarea>
      <div className="add-review__submit">
        <button className="add-review__btn" type="submit">Post</button>
      </div>

    </div>
  </form>;
};

AddReviewForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  pageId: PropTypes.number.isRequired,
};

export default AddReviewForm;
