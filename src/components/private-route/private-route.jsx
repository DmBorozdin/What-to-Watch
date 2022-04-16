import React from "react";
import PropTypes from "prop-types";
import {Route, Redirect} from "react-router-dom";
import {useSelector} from "react-redux";
import {AuthorizationStatus, APIRoute} from "../../const";

const PrivateRoute = ({render, path, exact}) => {
  const {authorizationStatus} = useSelector((state) => state.USER);
  return (
    <Route
      path={path}
      exact={exact}
      render={(routeProps) => authorizationStatus === AuthorizationStatus.AUTH ? render(routeProps) : <Redirect to={APIRoute.LOGIN}/>}
    />
  );
};
PrivateRoute.propTypes = {
  render: PropTypes.func.isRequired,
  path: PropTypes.string.isRequired,
  exact: PropTypes.bool.isRequired,
};

export default PrivateRoute;
