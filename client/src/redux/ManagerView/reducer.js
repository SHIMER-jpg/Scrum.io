import {
  GET_TASKS_BY_PROJECT,
  GET_PROJECT_BY_ID,
  GET_ASIGNED_USERS,
  UPDATE_TASK,
} from "./constants";

const initialState = {
  project: {},
  asignedUsers: [],
  tasks: [],
};

const managerViewReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PROJECT_BY_ID:
      return {
        ...state,
        project: action.payload,
      };
    case GET_TASKS_BY_PROJECT:
      return {
        ...state,
        tasks: [...action.payload],
      };
    case UPDATE_TASK:
      const newTasks = state.tasks.map((task) => {
        if (task._id == action.paylad.change.taskId) {
          task[action.payload.change.field] = action.payload.change.value;
        }
      });
      return { ...state };
    // return {
    //   ...state,
    //   tasks: [...action.payload],
    // };
    case GET_ASIGNED_USERS:
      return {
        ...state,
        asignedUsers: [...action.payload],
      };
    default:
      return state;
  }
};

export default managerViewReducer;
