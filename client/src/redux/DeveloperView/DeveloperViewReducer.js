import { CONSTANTS } from '../constants/index.js';

const initialState = {
  userTasks: [],
  helpTasks: [],
  taskDetails: {},
  note: []
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case CONSTANTS.GET_USER_TASKS:
      return {
        ...state,
        userTasks: action.payload
      }
    case CONSTANTS.GET_HELP_TASKS:
      return {
        ...state,
        helpTasks: action.payload
      }
    case CONSTANTS.SET_TASK_DETAILS:
      return{
        ...state,
        taskDetails: action.payload
      }
    case CONSTANTS.POST_NOTE:
      return{
        ...state,
        note: state.note.concat([action.payload])
      }
    default:
      return state;
    }
}
