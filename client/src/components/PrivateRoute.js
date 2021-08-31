import { Redirect, Route } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

const PrivateRoute = ({ component, ...rest }) => {
  const { isAuthenticated } = useAuth0();

  return isAuthenticated ? (
    <Route component={component} {...rest} />
  ) : (
    <Redirect to="/" />
  );
};

export default PrivateRoute;
