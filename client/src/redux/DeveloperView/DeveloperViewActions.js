import axios from "axios";

import { CONSTANTS } from './constants.js';
import PROJECTS from '../../hardcodingDataBD';

require("dotenv").config();
const { REACT_APP_BACKEND_HOST, REACT_APP_BACKEND_PORT } = process.env;

export function getTasksByUser(projectId, userId){
  return async function(dispatch){
    
    // el que deberia ir para usar con id de usuarios reales

    // // obtiene todas las tareas del projecto pasado por projectId
    // var userTasks = await axios.get(`http://${REACT_APP_BACKEND_HOST}:${REACT_APP_BACKEND_PORT}/project/${projectId}`);
    // userTasks = userTasks.filter(t => t.asignedTo === userId) //filtro las tareas del proyecto con el id del usuario
    // return dispatch({
    //   type: CONSTANTS.GET_USER_TASKS,
    //   payload: userTasks
    // })


    // hardcodeado con el mock 'hardcodingDataBD' 
    var project = PROJECTS.find(p => p.id === projectId); //encuentro el proyecto por id
    var userTasks = project.taskList.filter(t => t.userId === userId) //filtro las tareas del proyecto con el id del usuario
    return dispatch({
      type: CONSTANTS.GET_USER_TASKS,
      payload: userTasks
    })
  }
}

export function getHelpTasks(projectId){
  return async function(dispatch){
    // el que deberia ir si hubieran tareas con ayuda en la bd

    // // obtiene todas las tareas del projecto pasado por projectId
    // var helpTasks = await axios.get(`http://${REACT_APP_BACKEND_HOST}:${REACT_APP_BACKEND_PORT}/project/${projectId}`);
    // helpTasks = helpTasks.filter(t => t.helpNeeded) //filtro las tareas del proyecto que requieren de ayuda
    // return dispatch({
    //   type: CONSTANTS.GET_HELP_TASKS,
    //   payload: helpTasks
    // })

    // hardcodeado con el mock 'hardcodingDataBD' 
    var project = PROJECTS.find(p => p.id === projectId); //encuentro el proyecto por id
    var helpTasks = project.taskList.filter(t => t.helpNeeded) //filtro las tareas del proyecto que requieren de ayuda
    return dispatch({
      type: CONSTANTS.GET_HELP_TASKS,
      payload: helpTasks
    })
  }
}
