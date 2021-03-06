import { CONSTANTS } from "./constants.js";

const initialState = {
  userTasks: [],
  helpTasks: [],
  taskDetails: {},
  note: [],
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case CONSTANTS.GET_USER_TASKS:
      return {
        ...state,
        userTasks: action.payload,
      };
    case CONSTANTS.GET_HELP_TASKS:
      return {
        ...state,
        helpTasks: action.payload,
      };
    case CONSTANTS.SET_TASK_DETAILS:
      return {
        ...state,
        taskDetails: action.payload,
      };
    case CONSTANTS.CLEAR_DEV_VIEW: {
      return {
        userTasks: [],
        helpTasks: [],
        taskDetails: {},
        note: [],
      };
    }
    case "CLEAR_DEV_VIEW": {
      return {
        userTasks: [],
        helpTasks: [],
        taskDetails: {},
        note: [],
      };
    }
    default:
      return state;
  }
}
