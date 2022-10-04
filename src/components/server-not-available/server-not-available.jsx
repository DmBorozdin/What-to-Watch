import React, {Fragment} from "react";
import {Link} from "react-router-dom";
import {APPRoute} from "../../const";
import Logo from "../logo/logo";
import PageFooter from "../page-footer/page-footer";

const ServerNotAvailable = () => {
  return <Fragment>
    <div className="user-page">
      <header className="page-header">
        <Logo/>
      </header>

      <div className="user-page__content">
        <h1>Server not available</h1>
        <p>Please try to load the page later</p>
        <Link to={APPRoute.MAIN}>Go to the home page</Link>
      </div>

      <PageFooter render={() => false}/>
    </div>
  </Fragment>;
};

export default ServerNotAvailable;
