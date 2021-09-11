import axios from "axios";

import {
  GET_TASKS_BY_PROJECT,
  GET_ASIGNED_USERS,
  DELETE_PROJECT,
  GET_PROJECT_BY_ID,
  UPDATE_TASK,
  CREATE_TASK,
  DELETE_TASK,
  GET_ALL_USERS,
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
      .then(() => {
        dispatch({ type: CREATE_TASK });
        dispatch(getTasksByProject(task.projectId));
      })
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

export function getAllUsers() {
  return function (dispatch) {
    axios
      .get(
        `http://${REACT_APP_BACKEND_HOST}:${REACT_APP_BACKEND_PORT}/user/getAll`
      )
      .then((json) => {
        console.log(json.data, "holaaaaaaaaaaaaa");
        dispatch({ type: GET_ALL_USERS, payload: json.data });
      });
  };
}

export function assignUser(projectId, userId) {
  return function (dispatch) {
    console.log("entre aca");

    axios
      .put(
        `http://${REACT_APP_BACKEND_HOST}:${REACT_APP_BACKEND_PORT}/user/assignProject/${projectId}`,
        { userId }
      )
      .then((json) => {
        dispatch(getAsignedUsers(projectId))
        return json.data;
      });
  };
}

export function deleteUserFromProject(projectId, userId) {
  return function (dispatch) {
    console.log(userId, "hola");
    axios
      .delete(`http://localhost:3001/user/deleteUser/${projectId}`, {
        data: { userId },
      })
      .then((json) => {
        console.log(json);
        dispatch(getAsignedUsers(projectId))
        return json.data;
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

export function deleteProject(projectId) {
  return function (dispatch) {
    axios
      .delete(
        `http://${REACT_APP_BACKEND_HOST}:${REACT_APP_BACKEND_PORT}/project/${projectId}`
      )
      .then(dispatch({ type: DELETE_PROJECT }));
  };
}

export function deleteTask(taskId) {
  return function (dispatch) {
    axios
      .delete(
        `http://${REACT_APP_BACKEND_HOST}:${REACT_APP_BACKEND_PORT}/task/${taskId}`
      )
      .then(dispatch({ type: DELETE_TASK, payload: taskId }));
  };
}
