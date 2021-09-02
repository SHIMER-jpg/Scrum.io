import { useAuth0 } from "@auth0/auth0-react";
import Header from "./components/Header/Header.js";
import { Switch, Route, Redirect } from "react-router-dom";

//components
import PrivateRoute from "./components/HOCS/PrivateRoute";
import TaskDetail from "./components/TaskDetail/TaskDetail";
import yo from './components/TaskDetail/mockupDataDetail';

// views
import NotFound from "./views/NotFound/NotFound";
import LandingPage from "./views/LandingPage/LandingPage";
import DeveloperView from "./views/DeveloperView/DeveloperView";
import ManagerView from "./views/ManagerView/ManagerView";

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
        <PrivateRoute path="/manager_view" exact component={ManagerView} />
        <PrivateRoute path="/developer_view" exact component={DeveloperView} />
        <PrivateRoute path="/detail" exact component={TaskDetail}/>
        <Route component={NotFound} />
      </Switch>
    </>
  );
};

export default App;
