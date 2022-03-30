import React from "react";
import PropTypes from "prop-types";
import {Route, Redirect} from "react-router-dom";
import {connect} from "react-redux";

const PrivateRoute = ({render, path, exact, authorizationStatus, AuthorizationStatus, redirect}) => {
  return (
    <Route
      path={path}
      exact={exact}
      render={(routeProps) => authorizationStatus === AuthorizationStatus ? render(routeProps) : <Redirect to={redirect}/>}
    />
  );
};
PrivateRoute.propTypes = {
  render: PropTypes.func.isRequired,
  path: PropTypes.string.isRequired,
  exact: PropTypes.bool.isRequired,
  authorizationStatus: PropTypes.string.isRequired,
  AuthorizationStatus: PropTypes.string.isRequired,
  redirect: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  authorizationStatus: state.authorizationStatus,
});

export {PrivateRoute};
export default connect(mapStateToProps, null)(PrivateRoute);
