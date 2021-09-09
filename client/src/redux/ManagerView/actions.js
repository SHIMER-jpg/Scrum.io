import axios from "axios";

import {
  GET_TASKS_BY_PROJECT,
  GET_ASIGNED_USERS,
  GET_PROJECT_BY_ID,
  UPDATE_TASK,
  CREATE_TASK,
} from "./constants";

require("dotenv").config();
const { REACT_APP_BACKEND_HOST, REACT_APP_BACKEND_PORT } = process.env;

export function getProjectById(projectId) {
  return function (dispatch) {
    axios
      .get(
        `http://${REACT_APP_BACKEND_HOST}:${REACT_APP_BACKEND_PORT}/project/project/${projectId}`
      )
      .then((json) => {
        dispatch({ type: GET_PROJECT_BY_ID, payload: json.data });
      });
  };
}

// export function postTask(task) {
//   return function (dispatch) {
//     axios
//       .post(
//         `http://${REACT_APP_BACKEND_HOST}:${REACT_APP_BACKEND_PORT}/task/createTask`,
//         task
//       )
//       .then((resp) => {
//         dispatch({ type: "asdas" });
//         return resp.data;
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   };
// }

export function getTasksByProject(projectId, setIsLoadingTasks) {
  //not any paload since it uses the already stored project
  return function (dispatch) {
    axios
      .get(
        `http://${REACT_APP_BACKEND_HOST}:${REACT_APP_BACKEND_PORT}/task/project/${projectId}`
      )
      .then((json) => {
        setIsLoadingTasks && setIsLoadingTasks(false);
        dispatch({ type: GET_TASKS_BY_PROJECT, payload: json.data });
      });
  };
}

export function createTask(task) {
  return function (dispatch) {
    axios
      .post(
        `http://${REACT_APP_BACKEND_HOST}:${REACT_APP_BACKEND_PORT}/task/createTask`,
        { ...task }
      )
      .then(() => dispatch({ type: CREATE_TASK }))
      .catch(console.log);
  };
}

export function getAsignedUsers(projectId) {
  return function (dispatch) {
    axios
      .get(
        `http://${REACT_APP_BACKEND_HOST}:${REACT_APP_BACKEND_PORT}/user/project?id=${projectId}`
      )
      .then((json) => {
        dispatch({ type: GET_ASIGNED_USERS, payload: json.data });
      });
  };
}

export function updateTask(change) {
  return function (dispatch) {
    axios
      .put(
        `http://${REACT_APP_BACKEND_HOST}:${REACT_APP_BACKEND_PORT}/task/update`,
        change
      )
      .then(dispatch({ type: UPDATE_TASK, payload: change }));
  };
}
