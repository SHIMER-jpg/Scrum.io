import { useAuth0 } from "@auth0/auth0-react";
import Header from "./components/Header";
import { Switch, Route, Redirect } from "react-router-dom";

import ManagementPage from "./views/ManagementPage";

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
      <Route path="/home" component={Header} />
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
    </>
  );
};

export default App;
