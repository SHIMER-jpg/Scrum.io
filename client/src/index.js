import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import Auth0ProviderWithHistory from "./auth/auth0provider";
import { Provider } from "react-redux";

import 'react-toastify/dist/ReactToastify.css';

import App from "./App";
import store from "./redux/store/indexStore";
import "./globals.css";

const isDarkMode = localStorage.getItem("darkMode");

if(isDarkMode) {
  document.body.classList.add("darkMode");
} else {
  document.body.classList.remove("darkMode");
}

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
