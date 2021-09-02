import { GET_TASKS_BY_PROJECT, GET_PROJECT_BY_ID } from "./constants";

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
        tasks: [...state.project.tasks],
      };
    default:
      return state;
  }
};

export default managerViewReducer;
