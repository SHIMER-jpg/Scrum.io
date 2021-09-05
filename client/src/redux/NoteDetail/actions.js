import axios from "axios";
import { GET_NOTES_DETAILS, CLEAR_NOTES } from "./constants";
require("dotenv").config();
const { REACT_APP_BACKEND_HOST, REACT_APP_BACKEND_PORT } = process.env;

export function getNotesDetails(taskId) {
  return function (dispatch) {
    axios
      .get(
        `http://${REACT_APP_BACKEND_HOST}:${REACT_APP_BACKEND_PORT}/note/${taskId}`
      )
      .then((json) => {
        dispatch({ type: GET_NOTES_DETAILS, payload: json.data });
      });
  };
}

export function clearNotes() {
  return { type: CLEAR_NOTES };
}
