import React, {useState} from "react";
import {ReviewFormType} from "../../const";

const AddReviewForm = () => {
  const [review, setReview] = useState({
    text: ``,
    rating: 0,
  });

  const handleAddReview = (evt) => {
    switch (evt.target.tagName) {
      case ReviewFormType.INPUT:
        setReview({
          ...review,
          rating: evt.target.value,
        });
        break;
      case ReviewFormType.TEXTAREA:
        setReview({
          ...review,
          text: evt.target.value,
        });
        break;
    }
  };

  return <form action="#" className="add-review__form" onChange={handleAddReview}>
    <div className="rating">
      <div className="rating__stars">
        <input className="rating__input" id="star-1" type="radio" name="rating" value="1"/>
        <label className="rating__label" htmlFor="star-1">Rating 1</label>

        <input className="rating__input" id="star-2" type="radio" name="rating" value="2" />
        <label className="rating__label" htmlFor="star-2">Rating 2</label>

        <input className="rating__input" id="star-3" type="radio" name="rating" value="3" checked />
        <label className="rating__label" htmlFor="star-3">Rating 3</label>

        <input className="rating__input" id="star-4" type="radio" name="rating" value="4" />
        <label className="rating__label" htmlFor="star-4">Rating 4</label>

        <input className="rating__input" id="star-5" type="radio" name="rating" value="5" />
        <label className="rating__label" htmlFor="star-5">Rating 5</label>

        <input className="rating__input" id="star-6" type="radio" name="rating" value="6"/>
        <label className="rating__label" htmlFor="star-6">Rating 6</label>

        <input className="rating__input" id="star-7" type="radio" name="rating" value="7" />
        <label className="rating__label" htmlFor="star-7">Rating 7</label>

        <input className="rating__input" id="star-8" type="radio" name="rating" value="8" checked />
        <label className="rating__label" htmlFor="star-8">Rating 8</label>

        <input className="rating__input" id="star-9" type="radio" name="rating" value="9" />
        <label className="rating__label" htmlFor="star-9">Rating 9</label>

        <input className="rating__input" id="star-10" type="radio" name="rating" value="10" />
        <label className="rating__label" htmlFor="star-10">Rating 10</label>
      </div>
    </div>

    <div className="add-review__text">
      <textarea className="add-review__textarea" name="review-text" id="review-text" placeholder="Review text"></textarea>
      <div className="add-review__submit">
        <button className="add-review__btn" type="submit">Post</button>
      </div>

    </div>
  </form>;
};

export default AddReviewForm;
