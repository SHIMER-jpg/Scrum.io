/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Switch, Route, Redirect } from "react-router-dom";
import { useDispatch } from "react-redux";
import io from "socket.io-client";

import { setUser, setSocket } from "./redux/App/actions.js";
//components
import PrivateRoute from "./components/HOCS/PrivateRoute";
import ViewRouter from "./components/ViewRouter/ViewRouter";
import Statistics from "./components/Statistics/Statistics.js";

// views
import Home from "./views/Home/Home";
import NotFound from "./views/NotFound/NotFound";
import LandingPage from "./views/LandingPage/LandingPage";
import DeveloperView from "./views/DeveloperView/DeveloperView";
import ManagerView from "./views/ManagerView/ManagerView";
import Layout from "./components/Layout/Layout.js";
import { Manager } from "socket.io-client";

const BACKEND_HOST = process.env.REACT_APP_BACKEND_HOST;
const BACKEND_PORT = process.env.REACT_APP_BACKEND_PORT;

const App = () => {
  const { isLoading, isAuthenticated, getIdTokenClaims } = useAuth0();
  const dispatch = useDispatch();

  useEffect(() => {
    const socket = io("http://localhost:3001/");
    // client-side
    socket.on("connect", () => {
      console.log("socket conectado", socket.id); // x8WIv7-mJelg7on_ALbx
    });
    dispatch(setSocket(socket));

    isAuthenticated &&
      (async () => {
        const tokenClaims = await getIdTokenClaims();
        const { data } = await axios.post(
          `http://${BACKEND_HOST}:${BACKEND_PORT}/user/findOrCreate`,
          {
            providerId: tokenClaims.sub,
            picture: tokenClaims.picture,
            username: tokenClaims.nickname,
            email: tokenClaims.email,
            name: tokenClaims.name,
          }
        );
        dispatch(setUser(data));
      })();
  }, [isAuthenticated]);

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
          <PrivateRoute
            path="/project/:projectId"
            exact
            component={ViewRouter}
          />
          <PrivateRoute
            path="/project/:projectId/statistics"
            exact
            component={Statistics}
          />
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
