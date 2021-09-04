import axios from "axios";
import { GET_ROLE } from "./constants";
require("dotenv").config();
const { REACT_APP_BACKEND_HOST, REACT_APP_BACKEND_PORT } = process.env;

// accion para setear los datos del usuario loggeado actualmente
// y que todos los componentes y views puedan acceder al mismo
export const getRole = (userId, projectId) => {
  return function (dispatch) {
    axios
      .get(
        `http://${REACT_APP_BACKEND_HOST}:${REACT_APP_BACKEND_PORT}/user/userRole?userId=${userId}&projectId=${projectId}`
      )
      .then((json) => dispatch({ type: GET_ROLE, payload: json.data }));
  };
};
