import {createReducer} from "@reduxjs/toolkit";
import {setReviewForm, setReviewFormError} from "../action";
import {ReviewFormStatus, ReviewFormError} from "../../const";

const initialState = {
  reviewFormStatus: ReviewFormStatus.ENABLE,
  isReviewFormSubmError: ReviewFormError.NO_ERROR,
};

const review = createReducer(initialState, (builder) => {
  builder.addCase(setReviewForm, (state, action) => {
    state.reviewFormStatus = action.payload;
  });
  builder.addCase(setReviewFormError, (state, action) => {
    state.isReviewFormSubmError = action.payload;
  });
});

export {review};
