import { CONSTANTS } from "./constants.js";
import axios from "axios";
const { REACT_APP_BACKEND_URL } = process.env;

export function createDate(date) {
  return function (dispatch) {
    // obtiene todas las tareas del projecto pasado por projectId
    axios
      .post(`${REACT_APP_BACKEND_URL}/calendary/createEvent`, date)
      .then((resp) => {
        dispatch({ type: CONSTANTS.POST_DATE, payload: resp.data });
      });
  };
}

export function getDates(projectId) {
  return function (dispatch) {
    axios
      .get(`${REACT_APP_BACKEND_URL}/calendary/getEvent/${projectId}`)
      .then((json) => {
        dispatch({ type: CONSTANTS.GET_DATES, payload: json.data });
      });
  };
}
