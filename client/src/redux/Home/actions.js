import axios from "axios";

import {
  CREATE_PROJECT,
  GET_ALL_USERS,
  SET_USER,
  GET_PROJECTS_BY_USER,
} from "./constants";

const { REACT_APP_BACKEND_URL } = process.env;

export function createProject(project) {
  return function (dispatch) {
    axios
      .post(
        `${REACT_APP_BACKEND_URL}/project/createProject`,
        project
      )
      .then((response) => {
        dispatch(getProjectByUserId(project.scrumMaster));
        dispatch({ type: CREATE_PROJECT });
        return response.data;
      })
      .catch((err) => {
        console.log(err);
      });
  };
}

export function getProjectByUserId(userId, setIsLoadingProjects) {
  return function (dispatch) {
    axios
      .get(
        `${REACT_APP_BACKEND_URL}/project/user/${userId}`
      )
      .then((data) => {
        dispatch({ type: GET_PROJECTS_BY_USER, payload: data.data });
        setIsLoadingProjects && setIsLoadingProjects(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };
}

export function fetchUsers() {
  return async function (dispatch, getState) {
    const {
      app: { loggedUser },
    } = await getState();

    axios(
      `${REACT_APP_BACKEND_URL}/user/getAll`
    )
      .then(({ data }) =>
        dispatch({ type: GET_ALL_USERS, payload: { users: data, loggedUser } })
      )
      .catch(console.log);
  };
}

export const setUser = (payload) => ({
  type: SET_USER,
  payload,
});
