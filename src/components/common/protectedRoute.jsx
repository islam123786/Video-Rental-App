import React from "react";
import { Route, Redirect } from "react-router-dom";
import auth from "../../services/authService";

const ProtectedRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        console.log(props);
        if (auth.getCurrentUser()) return <Component {...props} />;
        else return <Redirect to="/login" />;
      }}
    />
  );
};

export default ProtectedRoute;
