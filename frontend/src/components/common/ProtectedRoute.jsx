import React from "react";
import { Route, Redirect } from "react-router-dom";
import { getCurrentUser } from "../../services/http/authService";

const ProtectedRoute = ({ path, component: Component, render, ...rest }) => {
  return (
    <Route
      path={path}
      {...rest}
      render={props => {
        if (!getCurrentUser())
          return (
            <Redirect
              to={{ pathname: "/signin", state: { from: props.location } }}
            />
          );
        return Component ? <Component {...props} /> : render(props);
      }}
    />
  );
};

export default ProtectedRoute;
