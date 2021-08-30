import { useAuth0 } from "@auth0/auth0-react";
import { Switch, Route } from "react-router-dom";

import Cards from "./Cards";

const App = () => {
  const { isLoading } = useAuth0();

  return (
    <>
      {isLoading ? (
        <h1>Cargando...</h1>
      ) : (
        <>
          <Switch>
            <Route path="/" component={Cards} exact />
          </Switch>
        </>
      )}
    </>
  );
};

export default App;
