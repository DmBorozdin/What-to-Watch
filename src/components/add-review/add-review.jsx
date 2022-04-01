import React from "react";
import {Link, useParams} from "react-router-dom";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import filmProp from "../../common-props/film.js";
import AddReviewForm from "../add-review-form/add-review-form";
import {APPRoute, AuthorizationStatus} from "../../const.js";
import UserBlock from "../user-block/user-block.jsx";
import {ActionCreator} from "../../store/action.js";
import authInfoProp from "../../common-props/auth-info";

const AddReview = ({films, authInfo, onUserAvatarClick}) => {
  const pageId = Number(useParams().id);
  const film = films.find((item) => item.id === pageId);

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

          <UserBlock avatarUrl={authInfo.avatarUrl} authorizationStatus={AuthorizationStatus.AUTH} onUserAvatarClick={onUserAvatarClick}/>
        </header>

        <div className="movie-card__poster movie-card__poster--small">
          <img src={film.previewImage} alt={`${film.name}` + ` poster`} width="218" height="327" />
        </div>
      </div>

      <div className="add-review">
        <AddReviewForm/>
      </div>

    </section>
  </React.Fragment>;
};

AddReview.propTypes = {
  films: PropTypes.arrayOf(filmProp).isRequired,
  onUserAvatarClick: PropTypes.func.isRequired,
  authInfo: authInfoProp,
};

const mapStateToProps = (state) => ({
  films: state.films,
  authInfo: state.authInfo,
});

const mapDispatchToProps = (dispatch) => ({
  onUserAvatarClick() {
    dispatch(ActionCreator.redirectToRoute(APPRoute.MYLIST));
  },
});

export {AddReview};
export default connect(mapStateToProps, mapDispatchToProps)(AddReview);
