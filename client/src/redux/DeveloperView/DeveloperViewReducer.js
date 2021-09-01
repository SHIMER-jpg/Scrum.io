import CONSTANTS from '../constants/index.js';

const initialState = {
  tasks: [],
  helpTasks: []
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case CONSTANTS.GET_USER_TASKS:
      return {
        ...state,
        tasks: action.payload
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
