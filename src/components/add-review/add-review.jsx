import React, {useEffect} from "react";
import {Link, useParams} from "react-router-dom";
import {useSelector, useDispatch} from "react-redux";
import AddReviewForm from "../add-review-form/add-review-form";
import {APPRoute, AuthorizationStatus, ReviewFormStatus, ReviewFormError} from "../../const.js";
import UserBlock from "../user-block/user-block.jsx";
import {redirectToRoute, setReviewForm, setReviewFormError} from "../../store/action.js";
import {sendComment} from "../../store/api-actions.js";

const AddReview = () => {
  const {films, authInfo} = useSelector((state) => state.DATA);
  const {reviewFormStatus, isReviewFormSubmError} = useSelector((state) => state.REVIEW);
  const pageId = Number(useParams().id);
  const film = films.find((item) => item.id === pageId);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isReviewFormSubmError === ReviewFormError.ERROR) {
      dispatch(setReviewFormError(ReviewFormError.NO_ERROR));
    }
  }, []);

  const onSubmitReview = (commentPost) => {
    dispatch(sendComment(commentPost));
    dispatch(setReviewForm(ReviewFormStatus.DISABLE));
  };

  const handleUserAvatarClick = () => {
    dispatch(redirectToRoute(APPRoute.MYLIST));
  };

  return <React.Fragment>
    <section className="movie-card movie-card--full">
      <div className="movie-card__header">
        <div className="movie-card__bg">
          <img src="img/bg-the-grand-budapest-hotel.jpg" alt={film.name} />
        </div>

        <h1 className="visually-hidden">WTW</h1>

        <header className="page-header">
          <div className="logo">
            <Link to={APPRoute.MAIN} className="logo__link">
              <span className="logo__letter logo__letter--1">W</span>
              <span className="logo__letter logo__letter--2">T</span>
              <span className="logo__letter logo__letter--3">W</span>
            </Link>
          </div>

          <nav className="breadcrumbs">
            <ul className="breadcrumbs__list">
              <li className="breadcrumbs__item">
                <Link to={`${APPRoute.FILMS}/${film.id}`} className="breadcrumbs__link">{film.name}</Link>
              </li>
              <li className="breadcrumbs__item">
                <a className="breadcrumbs__link">Add review</a>
              </li>
            </ul>
          </nav>

          <UserBlock avatarUrl={authInfo.avatarUrl} authorizationStatus={AuthorizationStatus.AUTH} onUserAvatarClick={handleUserAvatarClick}/>
        </header>

        <div className="movie-card__poster movie-card__poster--small">
          <img src={film.previewImage} alt={`${film.name}` + ` poster`} width="218" height="327" />
        </div>
      </div>

      <div className="add-review">
        <AddReviewForm onSubmit={onSubmitReview} pageId={pageId} reviewFormStatus={reviewFormStatus}/>
      </div>
      {isReviewFormSubmError === ReviewFormError.ERROR &&
        <div className="rating__error-message">
          <p>An error occurred while submitting the form. Please try later.</p>
        </div>
      }
    </section>
  </React.Fragment>;
};

export default AddReview;
