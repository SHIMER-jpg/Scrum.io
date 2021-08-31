import { useAuth0 } from "@auth0/auth0-react";
import { Switch, Route, Redirect } from "react-router-dom";

import ManagementPage from "./views/ManagementPage";

import NotFound from "./components/NotFound";
import PrivateRoute from "./components/PrivateRoute";
import LandingPage from "./views/LandingPage";

const App = () => {
  const { isLoading, isAuthenticated } = useAuth0();

  return isLoading ? (
    <h1>Cargando...</h1>
  ) : (
    <Switch>
      <Route
        path="/"
        exact
        render={() =>
          isAuthenticated ? <Redirect to="/home" /> : <LandingPage />
        }
      />
      {/* <PrivateRoute path="/home" exact component={ManagementPage} /> */}
      <Route path="/home" exact component={ManagementPage} />
      <Route component={NotFound} />
    </Switch>
  );
};

export default App;
