import { useAuth0 } from "@auth0/auth0-react";
import { Switch, Route } from "react-router-dom";

import Cards from "./components/Cards";
import LandingPage from "./views/LandingPage";

const App = () => {
  const { isLoading, isAuthenticated } = useAuth0();

  return (
    <>
      {isLoading ? (
        <h1>Cargando...</h1>
      ) : (
        <>
          {isAuthenticated ? (
            <Switch>
              <Route path="/" component={Cards} exact />
            </Switch>
          ) : (
            <Route path="/" component={LandingPage} />
          )}
        </>
      )}
    </>
  );
};

export default App;
