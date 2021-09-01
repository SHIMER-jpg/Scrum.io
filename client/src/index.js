import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import Auth0ProviderWithHistory from "./auth/auth0provider";
import { Provider } from "react-redux";

import App from "./App";
import store from './redux/store/indexStore';
import "./globals.css";

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Auth0ProviderWithHistory>
        <React.StrictMode>
          <App />
        </React.StrictMode>
      </Auth0ProviderWithHistory>
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);
