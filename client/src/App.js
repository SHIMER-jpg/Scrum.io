/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Switch, Route, Redirect } from "react-router-dom";
import { useDispatch } from "react-redux";
import io from "socket.io-client";

import {
  setUser,
  setSocket,
  getUnreadNotificationsByUser,
} from "./redux/App/actions.js";
//components
import PrivateRoute from "./components/HOCS/PrivateRoute";
import ViewRouter from "./components/ViewRouter/ViewRouter";
import Statistics from "./views/Statistics/Statistics.js";

// views
import Home from "./views/Home/Home";
import NotFound from "./views/NotFound/NotFound";
import LandingPage from "./views/LandingPage/LandingPage";
import Layout from "./components/Layout/Layout.js";
import PokerPlanning from "./views/PokerPlanning/PokerPlanning";
import { Configuration } from "./views/Configuration/Configuration.js";
import JitsiMeet from "./views/JitsiMeet/JitsiMeet.js";
import AdsContainer from "./views/AdsContainer/AdsContainer.js";
import Profile from "./views/Profile/Profile";
import TeamComposition from "./views/TeamComposition/TeamComposition.js";

const { REACT_APP_BACKEND_URL } = process.env;

const App = () => {
  const { isLoading, isAuthenticated, getIdTokenClaims } = useAuth0();
  const dispatch = useDispatch();

  useEffect(() => {
    const socket = io.connect(`${REACT_APP_BACKEND_URL}`, {
      transports: ["websocket"],
    });

    // client-side
    dispatch(setSocket(socket));

    isAuthenticated &&
      (async () => {
        const tokenClaims = await getIdTokenClaims();
        const { data } = await axios.post(
          `${REACT_APP_BACKEND_URL}/user/findOrCreate`,
          {
            providerId: tokenClaims.sub,
            picture: tokenClaims.picture,
            username: tokenClaims.nickname,
            email: tokenClaims.email,
            name: tokenClaims.name,
          }
        );
        dispatch(setUser(data));
        dispatch(getUnreadNotificationsByUser(data._id));
      })();
  }, [isAuthenticated]);

  return isLoading ? (
    <div
      style={{
        height: "100vh",
        backgroundColor: "var(--white)",
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
            path="/planning/:projectId"
            exact
            component={PokerPlanning}
          />
          <PrivateRoute
            path="/statistics/:projectId"
            exact
            component={Statistics}
          />
          <PrivateRoute
            path="/teamComp/:projectId"
            exact
            component={TeamComposition}
          />
          <PrivateRoute
            path="/advertisements/:projectId"
            exact
            component={AdsContainer}
          />
          <PrivateRoute
            path="/meeting/:projectId"
            exact
            component={JitsiMeet}
          />
          <PrivateRoute path="/myProfile" exact component={Profile} />
          <PrivateRoute path="/configuration" exact component={Configuration} />
        </Layout>
        <Route component={NotFound} />
      </Switch>
    </>
  );
};

export default App;
