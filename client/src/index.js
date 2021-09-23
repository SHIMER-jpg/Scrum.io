import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import Auth0ProviderWithHistory from "./auth/auth0provider";
import { Provider } from "react-redux";

import "react-toastify/dist/ReactToastify.css";

import App from "./App";
import store from "./redux/store/indexStore";
import "./globals.css";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
// import 'sweetalert2/dist/sweetalert2.min.css'
import DateFnsUtils from "@date-io/moment";

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Auth0ProviderWithHistory>
        <React.StrictMode>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <App />
          </MuiPickersUtilsProvider>
        </React.StrictMode>
      </Auth0ProviderWithHistory>
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);
