import axios from "axios";

import {
  GET_TASKS_BY_PROJECT,
  GET_ASIGNED_USERS,
  GET_PROJECT_BY_ID,
} from "./constants";

require("dotenv").config();
const { BACKEND_HOST, BACKEND_PORT } = process.env;

export function getProyectByID(projectId) {
  return function (dispatch) {
    axios
      .get(`http://${BACKEND_HOST}:${BACKEND_PORT}/project/${projectId}`)
      .then((json) => {
        dispatch({ type: GET_PROJECT_BY_ID, payload: json.data });
      });
  };
}

export function getTasksByProject() {
  //not any paload since it uses the already stored project
  return { type: GET_TASKS_BY_PROJECT };
}
