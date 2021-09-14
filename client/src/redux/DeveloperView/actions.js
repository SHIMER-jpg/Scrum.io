import axios from "axios";

import { CONSTANTS } from "./constants.js";

require("dotenv").config();
const { REACT_APP_BACKEND_URL } = process.env;

export function getTasksByUser(projectId, userId) {
  return async function (dispatch) {
    // obtiene todas las tareas del projecto pasado por projectId para luego filtrar y agarrar solo las del usuario loggeado en el reducer
    const { data } = await axios.get(
      `${REACT_APP_BACKEND_URL}/task/user?userId=${userId}&projectId=${projectId}`
    );

    // no me muestre como pendientes las tareas que ya estan completadas.
    const myTasks = data.filter((t) => t.status !== "Completed");

    dispatch({
      type: CONSTANTS.GET_USER_TASKS,
      payload: myTasks,
    });
  };
}

export function getHelpTasks(projectId) {
  return async function (dispatch) {
    // obtiene todas las tareas del projecto pasado por projectId
    var helpTasks = await axios.get(
      `${REACT_APP_BACKEND_URL}/task/project/${projectId}`
    );
    return dispatch({
      type: CONSTANTS.GET_HELP_TASKS,
      payload: helpTasks.data.filter((t) => t.helpNeeded), //filtro las tareas del proyecto que requieren de ayuda
    });
  };
}

export const clearDevView = () => ({
  type: CONSTANTS.CLEAR_DEV_VIEW
})