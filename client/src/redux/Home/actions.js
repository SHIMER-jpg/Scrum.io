import axios from "axios";

import { CREATE_PROJECT } from "./constants";

require("dotenv").config();
const { REACT_APP_BACKEND_HOST, REACT_APP_BACKEND_PORT } = process.env;

export function createProject(project) {
  return function (dispatch) {
    axios
      .post(
        `http://${REACT_APP_BACKEND_HOST}:${REACT_APP_BACKEND_PORT}/project/createProject`,
        project
      )
      .then((response) => {
        dispatch({ type: CREATE_PROJECT });
        return response.data;
      })
      .catch((err) => {
        console.log(err);
      });
  };
}
