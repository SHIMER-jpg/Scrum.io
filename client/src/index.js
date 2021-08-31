import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import Auth0ProviderWithHistory from "./auth/auth0provider";

import App from "./App";
import "./styles/globals.css";

ReactDOM.render(
  <BrowserRouter>
    <Auth0ProviderWithHistory>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </Auth0ProviderWithHistory>
  </BrowserRouter>,
  document.getElementById("root")
);
