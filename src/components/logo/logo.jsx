import React from "react";
import {Link} from "react-router-dom";
import {APPRoute} from "../../const";
import PropTypes from "prop-types";

const Logo = ({isFooter}) => {
  return (
    <div className="logo">
      <Link to={APPRoute.MAIN} className={`logo__link ${isFooter ? `logo__link--light` : ``}`}>
        <span className="logo__letter logo__letter--1">W</span>
        <span className="logo__letter logo__letter--2">T</span>
        <span className="logo__letter logo__letter--3">W</span>
      </Link>
    </div>
  );
};

Logo.defaultProps = {
  isFooter: false,
};

Logo.propTypes = {
  isFooter: PropTypes.bool,
};

export default Logo;
