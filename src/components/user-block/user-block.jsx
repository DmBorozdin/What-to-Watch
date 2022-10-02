import React from "react";
import PropTypes from "prop-types";
import {Link} from "react-router-dom";
import {AuthorizationStatus, APPRoute} from "../../const";
import browserHistory from "../../browser-history";

const UserBlock = ({avatarUrl, authorizationStatus}) => {

  const handleAvatarClick = () => browserHistory.push(APPRoute.MYLIST);

  if (authorizationStatus === AuthorizationStatus.AUTH) {
    return (
      <div className="user-block">
        <div className="user-block__avatar" onClick={handleAvatarClick}>
          <img src={avatarUrl} alt="User avatar" width="63" height="63" />
        </div>
      </div>
    );
  }

  return (
    <div className="user-block">
      <Link to={APPRoute.LOGIN} className="user-block__link">Sign in</Link>
    </div>
  );
};

UserBlock.propTypes = {
  avatarUrl: PropTypes.string.isRequired,
  authorizationStatus: PropTypes.string.isRequired,
};

export default UserBlock;
