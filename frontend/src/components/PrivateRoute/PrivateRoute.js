import React from "react";
import { Route, Redirect } from "react-router-dom";
import { getUser } from "../../apis/storage";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const logged = getUser();

  return (
    <Route
      {...rest}
      render={props =>
        logged ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
};

export default PrivateRoute;