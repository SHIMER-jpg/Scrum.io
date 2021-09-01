import { CONSTANTS } from '../constants/index.js';
import PROJECTS from './../../hardcodingDataBD.js';

export function getTasksByUser(projectId, userId){
  return async function(dispatch){
    console.log(PROJECTS)
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
    var project = PROJECTS.find(p => p.id === projectId); //encuentro el proyecto por id
    var helpTasks = project.taskList.filter(t => t.helpNeeded) //filtro las tareas del proyecto que requieren de ayuda
    return dispatch({
      type: CONSTANTS.GET_HELP_TASKS,
      payload: helpTasks
    })
  }
}
