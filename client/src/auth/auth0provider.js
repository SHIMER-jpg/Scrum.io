import { Auth0Provider } from "@auth0/auth0-react";
import { useHistory } from "react-router-dom";

const Auth0ProviderWithMemory = ({ children }) => {
  const history = useHistory();

  const domain = process.env.REACT_APP_AUTH0_DOMAIN;
  const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID;
  const audience = process.env.REACT_APP_AUDIENCE;

  const onRedirectCallback = () => {
    history.push(window.location.pathname);
  };

  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      redirectUri={window.location.origin}
      onredi={onRedirectCallback}
      audience={audience}
    >
      {children}
    </Auth0Provider>
  );
};

export default Auth0ProviderWithMemory;
