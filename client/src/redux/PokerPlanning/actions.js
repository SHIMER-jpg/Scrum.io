import axios from "axios";
import CONSTANTS from "./constants.js";

const { REACT_APP_BACKEND_URL } = process.env;

export function change(payload) {
  return {
    type: CONSTANTS.CHANGE,
    payload: payload,
  };
}

export function changeTask(idTask, value, cb) {
  return function (dispatch) {
    axios
      .put(
        `${REACT_APP_BACKEND_URL}/task/update`,
        { taskId: idTask, field: "storyPoints", value }
      )
      .then((response) => {
        dispatch({ type: CONSTANTS.PUT_TASK });
        cb && cb();
        return response.data;
      })
      .catch((err) => {
        console.log(err);
      });
  };
}
