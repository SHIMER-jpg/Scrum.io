import { useAuth0 } from "@auth0/auth0-react";
import { Switch, Route, Redirect } from "react-router-dom";

//components
import PrivateRoute from "./components/HOCS/PrivateRoute";

// views
import Home from "./views/Home/Home";
import NotFound from "./views/NotFound/NotFound";
import LandingPage from "./views/LandingPage/LandingPage";
import DeveloperView from "./views/DeveloperView/DeveloperView";
import ManagerView from "./views/ManagerView/ManagerView";
import Layout from "./components/Layout/Layout.js";

const App = () => {
  const { isLoading, isAuthenticated } = useAuth0();

  return isLoading ? (
    <div
      style={{
        height: "100vh",
        backgroundColor: "white",
        display: "grid",
        placeItems: "center",
      }}
    >
      <div className="lds-dual-ring"></div>
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
        <Layout>
          <PrivateRoute path="/home" exact component={Home} />
          <PrivateRoute path="/manager_view" exact component={ManagerView} />
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
