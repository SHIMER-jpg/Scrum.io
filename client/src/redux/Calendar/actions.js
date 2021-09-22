import { CONSTANTS } from "./constants.js";
import axios from "axios"
const { REACT_APP_BACKEND_URL } = process.env;

export function createDate(date) {
    console.log(date)
    return function (dispatch) {
      // obtiene todas las tareas del projecto pasado por projectId
    axios.post(
        `${REACT_APP_BACKEND_URL}/calendary/createEvent`,  date 
      )
      .then((resp) => {
        return resp.data
      })
    };
  }