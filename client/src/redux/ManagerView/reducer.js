import {
  GET_TASKS_BY_PROJECT,
  GET_PROJECT_BY_ID,
  GET_ASIGNED_USERS,
  GET_ALL_USERS,
  UPDATE_TASK,
} from "./constants";

const initialState = {
  project: {},
  asignedUsers: [],
  tasks: [],
  allUsers: [],
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
        if (task._id === action.payload.taskId) {
          task[action.payload.field] = action.payload.value;
        }
        return task;
      });
      return { ...state, tasks: [...newTasks] };

    case GET_ASIGNED_USERS:
      return {
        ...state,
        asignedUsers: [...action.payload],
      };
    case GET_ALL_USERS:
      return {
        ...state,
        allUsers: action.payload,
      };
    default:
      return state;
  }
};

export default managerViewReducer;
