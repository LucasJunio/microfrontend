import React from "react";
import PropTypes from "prop-types";
import { Redirect, Route } from "react-router-dom";
// import { useSelector } from 'react-redux';

// import { useSelector } from "react-redux";

// Private router
export default function RouteWrapper({
  component: Component,
  isPrivate,
  ...rest
}) {
  // let validation = useSelector((state) => state.signin.signed);

  // if (!validation && isPrivate) {
  //   return <Redirect to="/signin" />;
  // }

  // if (validation && !isPrivate) {
  //   return <Redirect to="/" />;
  // }
  return <Route {...rest} render={(props) => <Component {...props} />} />;
}

RouteWrapper.propTypes = {
  isPrivate: PropTypes.bool,
  component: PropTypes.oneOfType([PropTypes.element, PropTypes.func])
    .isRequired,
};

RouteWrapper.defaultProps = {
  isPrivate: false,
};
