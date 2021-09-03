import { CONSTANTS } from './constants.js';

const initialState = {
  userTasks: [],
  helpTasks: [],
  loggedUser: {},
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case CONSTANTS.GET_USER_TASKS:
      return {
        ...state,
        userTasks: action.payload.filter((task) => task.asignedTo !== state.loggedUser._id),
      }
    case CONSTANTS.GET_HELP_TASKS:
      return {
        ...state,
        helpTasks: action.payload
      }
    default:
      return state;
    }
}
