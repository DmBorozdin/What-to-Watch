import MockAdapter from "axios-mock-adapter";
import {createApi} from "../../services/api";
import {review} from "./review";
import {ActionType} from "../action";
import {fetchComment, sendComment} from "../api-actions";
import {APIRoute, APPRoute, ReviewFormStatus, ReviewFormError} from "../../const";

const api = createApi(() => {});

describe(`Reducer 'review' should work correctly`, () => {
  it(`Reducer without additional parameters should return initial state`, () => {
    expect(review(undefined, {})).toEqual({
      reviewFormStatus: ReviewFormStatus.ENABLE,
      isReviewFormSubmError: ReviewFormError.NO_ERROR,
    });
  });

  it(`Reducer should update reviewFormStatus to 'DISABLE'`, () => {
    const state = {reviewFormStatus: ReviewFormStatus.ENABLE, isReviewFormSubmError: ReviewFormError.NO_ERROR};
    const setReviewFormStatusAction = {
      type: ActionType.SET_REVIEW_FORM,
      payload: ReviewFormStatus.DISABLE
    };

    expect(review(state, setReviewFormStatusAction)).toEqual({reviewFormStatus: ReviewFormStatus.DISABLE, isReviewFormSubmError: ReviewFormError.NO_ERROR});
  });

  it(`Reducer should update reviewFormError to 'Error'`, () => {
    const state = {reviewFormStatus: ReviewFormStatus.ENABLE, isReviewFormSubmError: ReviewFormError.NO_ERROR};
    const setReviewFormErrorAction = {
      type: ActionType.SET_REVIEW_FORM_ERR,
      payload: ReviewFormError.ERROR
    };

    expect(review(state, setReviewFormErrorAction)).toEqual({reviewFormStatus: ReviewFormStatus.ENABLE, isReviewFormSubmError: ReviewFormError.ERROR});
  });
});

describe(`Async operation should work correctly`, () => {
  it(`Should make a correct API call to /comments/id`, () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const id = 1;
    const fetchCommentLoader = fetchComment(id);

    apiMock
      .onGet(`${APIRoute.COMMENTS}${id}`)
      .reply(200, {fake: true});

    return fetchCommentLoader(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);

        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.LOAD_REVIEW,
          payload: {fake: true},
        });
      });
  });

  it(`Should make a correct API call when send comment to /comments/id`, () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const fakeComment = {rating: 7, comment: `Cool`, id: 1};
    const sendCommentLoader = sendComment(fakeComment);

    apiMock
      .onPost(`${APIRoute.COMMENTS}${fakeComment.id}`)
      .reply(200);

    return sendCommentLoader(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(2);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.REDIRECT_TO_ROUTE,
          payload: `${APPRoute.FILMS}/${fakeComment.id}`,
        });

        expect(dispatch).toHaveBeenNthCalledWith(2, {
          type: ActionType.SET_REVIEW_FORM,
          payload: ReviewFormStatus.ENABLE,
        });
      });
  });

  it(`Should make Error when send comment to /comments/id`, () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const fakeComment = {rating: 7, comment: `Cool`, id: 1};
    const sendCommentLoader = sendComment(fakeComment);

    apiMock
      .onPost(`${APIRoute.COMMENTS}${fakeComment.id}`)
      .reply(400);

    return sendCommentLoader(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(2);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.SET_REVIEW_FORM_ERR,
          payload: ReviewFormError.ERROR,
        });

        expect(dispatch).toHaveBeenNthCalledWith(2, {
          type: ActionType.SET_REVIEW_FORM,
          payload: ReviewFormStatus.ENABLE,
        });
      });
  });
});
