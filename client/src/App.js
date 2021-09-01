import { useAuth0 } from "@auth0/auth0-react";
import Header from "./components/Header/Header.js";
import { Switch, Route, Redirect } from "react-router-dom";

//components
import PrivateRoute from "./components/HOCS/PrivateRoute";

// views
import Home from "./views/Home";
import NotFound from "./views/NotFound/NotFound";
import LandingPage from "./views/LandingPage/LandingPage";
import DeveloperView from "./views/DeveloperView/DeveloperView";
import ManagerView from "./views/ManagerView/ManagerView";
import Layout from "./components/Layout/Layout.js";

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
        <Layout>
          <PrivateRoute path="/home" exact component={Home} />
          <PrivateRoute
            path="/developer_view"
            exact
            component={DeveloperView}
          />
        </Layout>
        <Route component={NotFound} />
      </Switch>
    </>
  );
};

export default App;
