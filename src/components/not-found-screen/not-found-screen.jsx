import React, {Fragment} from "react";
import {Link} from "react-router-dom";
import {APPRoute} from "../../const";
import Logo from "../logo/logo";
import PageFooter from "../page-footer/page-footer";

const NotFoundScreen = () => {
  return <Fragment>
    <div className="user-page">
      <header className="page-header">
        <Logo/>
      </header>

      <div className="user-page__content">
        <h1>404. Page not found</h1>
        <Link to={APPRoute.MAIN}>Go to the home page</Link>
      </div>

      <PageFooter render={() => false}/>
    </div>
  </Fragment>;
};

export default NotFoundScreen;
