import axios from "axios";

import {
  GET_TASKS_BY_PROJECT,
  GET_ASIGNED_USERS,
  GET_PROJECT_BY_ID,
} from "./constants";

require("dotenv").config();
// const { BACKEND_HOST, BACKEND_PORT } = process.env;


export function getProyectByID(projectId) {
  return function (dispatch) {
    axios
      .get(`http://localhost:3001/project/${projectId}`)
      .then((json) => {
        dispatch({ type: GET_PROJECT_BY_ID, payload: json.data });
      });
  };
}


export function postTask(task) {
  console.log("taskeeee",task)
  return function(dispatch){
    axios.post(`http://localhost:3001/task/createTask`, task)
    .then((resp) => {
      console.log("informacioooooon",resp.data)
      dispatch({type:"asdas"})
      return  resp.data
    })
    .catch((err) => {
      console.log("entro al catch",err)
    })
  }
}

export function getTasksByProject() {
  //not any paload since it uses the already stored project
  return { type: GET_TASKS_BY_PROJECT };
}
