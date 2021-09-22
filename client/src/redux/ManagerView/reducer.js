import {
  GET_TASKS_BY_PROJECT,
  GET_PROJECT_BY_ID,
  GET_ASIGNED_USERS,
  DELETE_PROJECT,
  GET_ALL_USERS,
  UPDATE_TASK,
  DELETE_TASK,
  CLEAR_MANAGER_VIEW,
  DELETE_TASKS,
  EDIT_PROJECT,
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
    case EDIT_PROJECT:
      return {
        ...state,
        project: {...state.project, projectName: action.payload.projectName},
      }
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
    case CLEAR_MANAGER_VIEW: {
      return {
        project: {},
        asignedUsers: [],
        tasks: [],
      }
    }
    case DELETE_PROJECT:
      return {
        ...state,
        project: {},
      };
    case DELETE_TASK:
      return {
        ...state,
        tasks: [...state.tasks.filter((task) => task._id !== action.payload)],
      };
    case GET_ALL_USERS:
      return {
        ...state,
        allUsers: action.payload,
      };

    case DELETE_TASKS:
      return {
        ...state,
        tasks: [],
      };
    default:
      return state;
  }
};

export default managerViewReducer;
