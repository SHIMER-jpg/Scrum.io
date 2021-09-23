import {
  GET_TASKS_BY_PROJECT,
  GET_PROJECT_BY_ID,
  GET_ASIGNED_USERS,
  DELETE_PROJECT,
  GET_ALL_USERS,
  UPDATE_TASK,
  UPDATE_MANY_TASKS,
  DELETE_TASK,
  DELETE_SELECTED_TASKS,
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
        project: {
          ...state.project,
          [action.payload.field]: action.payload.value,
        },
      };
    case UPDATE_TASK:
      const newTasks = state.tasks.map((task) => {
        if (task._id === action.payload.taskId) {
          task[action.payload.field] = action.payload.value;
        }
        return task;
      });
      return { ...state, tasks: [...newTasks] };

    case UPDATE_MANY_TASKS:
      const tasksChanged = state.tasks.map((task) => {
        let taskModifiedIndex = action.payload.findIndex(
          (payloadTask) => payloadTask.taskId === task._id
        );
        if (taskModifiedIndex > -1) {
          task = {
            ...task,
            ...action.payload[taskModifiedIndex].fieldsChanged,
          };
        }
        return task;
      });
      return { ...state, tasks: [...tasksChanged] };

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
        allUsers: [],
      };
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
    case DELETE_SELECTED_TASKS:
      return {
        ...state,
        tasks: [
          ...state.tasks.filter(
            (task) =>
              action.payload.findIndex(
                (payloadTaskId) => task._id === payloadTaskId
              ) === -1
          ),
        ],
      };
    default:
      return state;
  }
};

export default managerViewReducer;
