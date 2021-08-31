import { useAuth0 } from "@auth0/auth0-react";
import { Switch, Route, Redirect } from "react-router-dom";

import Cards from "./components/Cards";
import NotFound from "./components/NotFound";
import PrivateRoute from "./components/PrivateRoute";
import LandingPage from "./views/LandingPage";

const App = () => {
  const { isLoading, isAuthenticated } = useAuth0();

  return isLoading ? (
    <div style={{ height: "100vh", display: "grid", placeItems: "center" }}>
      <div class="lds-dual-ring"></div>
    </div>
  ) : (
    <>
      <Switch>
        <Route
          path="/"
          exact
          render={() =>
            isAuthenticated ? <Redirect to="/home" /> : <LandingPage />
          }
        />
        <PrivateRoute path="/home" exact component={Cards} />
        <Route component={NotFound} />
      </Switch>
    </>
  );
};

export default App;
