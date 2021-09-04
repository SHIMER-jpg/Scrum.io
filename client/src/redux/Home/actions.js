import axios from "axios";

import { CREATE_PROJECT, GET_ALL_USERS, SET_USER, GET_PROJECTS_BY_USER } from "./constants";

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

export function getProjectByUserId(userId){
  return function (dispatch) {
    axios
      .get(`http://${REACT_APP_BACKEND_HOST}:${REACT_APP_BACKEND_PORT}/project/user/${userId}`)
      .then((data) => {
        dispatch({ type: GET_PROJECTS_BY_USER, payload: data.data });
      })
      .catch((err) => {
        console.log(err);
      });
  };
}

export function fetchUsers(loggedUser) {
  return function (dispatch) {
    axios(
      `http://${REACT_APP_BACKEND_HOST}:${REACT_APP_BACKEND_PORT}/user/getAll`
    )
      .then(({ data }) => {
        console.log('data', data)
        return dispatch({ type: GET_ALL_USERS, payload: [data, loggedUser] })})
      .catch(console.log);
  };
}

export const setUser = (payload) => ({
  type: SET_USER,
  payload,
});
