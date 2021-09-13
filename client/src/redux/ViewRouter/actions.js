import axios from "axios";
import { GET_ROLE, CLEAR_ROLE } from "./constants";
require("dotenv").config();
const { REACT_APP_BACKEND_URL } = process.env;

// accion para setear los datos del usuario loggeado actualmente
// y que todos los componentes y views puedan acceder al mismo
export const getRole = (userId, projectId) => {
  return function (dispatch) {
    axios
      .get(
        `${REACT_APP_BACKEND_URL}/user/userRole?userId=${userId}&projectId=${projectId}`
      )
      .then((json) => dispatch({ type: GET_ROLE, payload: json.data }));
  };
};

export const clearRole = () => {
  return { type: CLEAR_ROLE };
};
