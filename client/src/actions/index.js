import axios from 'axios';
import CONSTANTS from './constants/index.js';

export function getTodos(){
  return async function(dispatch){
    var json = await axios.get(`http://localhost:3001/todos`);
    return dispatch({
      type: CONSTANTS.GET_USER_TODOS,
      payload: json.data
    })
  }
}

export function getTodoHelp(){
  return async function(dispatch){
    var json = await axios.get(`http://localhost:3001/todoHelp`);
    return dispatch({
      type: CONSTANTS.GET_HELP_TODOS,
      payload: json.data
    })
  }
}
