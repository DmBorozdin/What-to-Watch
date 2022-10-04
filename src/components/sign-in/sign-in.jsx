import React, {useRef, useState} from "react";
import {useDispatch} from "react-redux";
import {Link} from "react-router-dom";
import {login} from "../../store/api-actions";
import {APPRoute} from "../../const";

const SignIn = () => {
  const loginRef = useRef();
  const passwordRef = useRef();
  const dispatch = useDispatch();
  const [validErrText, setValidErrText] = useState(``);

  const createValidErrText = () => {
    if (loginRef.current.validity.valueMissing && passwordRef.current.validity.valueMissing) {
      setValidErrText(`Please enter email address and password`);
    } else {
      let loginErrText = ``;
      let passwordErrText = ``;
      if (loginRef.current.validity.valueMissing) {
        loginErrText = `email address`;
      } else if (loginRef.current.validity.patternMismatch) {
        loginErrText = `a valid email address (e.g. keks@mail.ru)`;
      }
      if (passwordRef.current.validity.valueMissing) {
        passwordErrText = `password`;
      } else if (passwordRef.current.validity.patternMismatch) {
        passwordErrText = `not empty password`;
      }
      setValidErrText(`Please enter ${loginErrText} ${loginErrText && passwordErrText ? ` and ` : ``} ${passwordErrText}`);
    }
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();

    if (loginRef.current.validity.valid && passwordRef.current.validity.valid) {
      dispatch(login({
        login: loginRef.current.value,
        password: passwordRef.current.value,
      }));
    } else {
      createValidErrText();
    }
  };

  return (
    <div className="user-page">
      <header className="page-header user-page__head">
        <div className="logo">
          <Link to={APPRoute.MAIN} className="logo__link">
            <span className="logo__letter logo__letter--1">W</span>
            <span className="logo__letter logo__letter--2">T</span>
            <span className="logo__letter logo__letter--3">W</span>
          </Link>
        </div>

        <h1 className="page-title user-page__title">Sign in</h1>
      </header>

      <div className="sign-in user-page__content">
        <form action="#" className="sign-in__form" onSubmit={handleSubmit} noValidate>
          {validErrText &&
            <div className="sign-in__message">
              <p>{validErrText}</p>
            </div>
          }
          <div className="sign-in__fields">
            <div className="sign-in__field">
              <input
                ref={loginRef}
                className="sign-in__input"
                type="email"
                placeholder="Email address"
                name="user-email"
                id="user-email"
                data-testid="login"
                pattern="^([^ ]+@[^ ]+\.[a-z]{2,6}|)$"
                required
              />
              <label className="sign-in__label visually-hidden" htmlFor="user-email">Email address</label>
            </div>
            <div className="sign-in__field">
              <input
                ref={passwordRef}
                className="sign-in__input"
                type="password"
                placeholder="Password"
                name="user-password"
                id="user-password"
                data-testid="password"
                pattern="\S*"
                required
              />
              <label className="sign-in__label visually-hidden" htmlFor="user-password">Password</label>
            </div>
          </div>
          <div className="sign-in__submit">
            <button className="sign-in__btn" type="submit">Sign in</button>
          </div>
        </form>
      </div>

      <footer className="page-footer">
        <div className="logo">
          <Link to={APPRoute.MAIN} className="logo__link logo__link--light">
            <span className="logo__letter logo__letter--1">W</span>
            <span className="logo__letter logo__letter--2">T</span>
            <span className="logo__letter logo__letter--3">W</span>
          </Link>
        </div>

        <div className="copyright">
          <p>© 2022 What to watch Ltd.</p>
        </div>
      </footer>
    </div>
  );
};

export default SignIn;
