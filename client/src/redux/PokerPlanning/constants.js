import axios from "axios";

import { PUT_TASK } from "./actions";

const { REACT_APP_BACKEND_HOST, REACT_APP_BACKEND_PORT } = process.env;

export function changeTask(idTask, value) {
  return function (dispatch) {
    axios
      .put(
        `http://${REACT_APP_BACKEND_HOST}:${REACT_APP_BACKEND_PORT}/task/${idTask}`,
        { value }
      )
      .then((response) => {
        dispatch({ type: PUT_TASK });
        return response.data;
      })
      .catch((err) => {
        console.log(err);
      });
  };
}
