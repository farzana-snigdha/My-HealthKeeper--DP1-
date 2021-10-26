import React from "react";
import { Route, Redirect } from "react-router-dom";
import {useSelector} from 'react-redux'

const PrivateRoute = ({ component: Component, ...rest }) => {
  const auth = useSelector(state => state.auth)
  const { isLogged } = auth
  console.log(isLogged)
  return (
    <Route
      {...rest}
      render={(props) => {
        return isLogged ? (
          <Component {...props} />
        ) : (
          <Redirect to="/login" />
        );
      }}
    ></Route>
  );
};

export default PrivateRoute;
