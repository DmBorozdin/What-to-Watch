import React from "react";
import PropTypes from "prop-types";
import {Route, Redirect} from "react-router-dom";
import {useSelector} from "react-redux";
import {AuthorizationStatus, APIRoute, APPRoute} from "../../const";
import {getUserData} from "../../store/user/selectors";

const PrivateRoute = ({render, path, exact}) => {
  const {authorizationStatus} = useSelector(getUserData);
  return (path === APPRoute.LOGIN ?
    <Route
      path={path}
      exact={exact}
      render={(routeProps) => authorizationStatus !== AuthorizationStatus.AUTH ? render(routeProps) : <Redirect to={APIRoute.MAIN}/>}
    /> :
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
