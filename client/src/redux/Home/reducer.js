import { GET_ALL_USERS, SET_USER, GET_PROJECTS_BY_USER } from "./constants.js";

const initialState = {
  users: [],
  projectList: [],
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_USERS: {
      return {
        ...state,
        users: action.payload.users.filter(
          (u) => u._id !== action.payload.loggedUser._id
        ),
      };
    }
    case GET_PROJECTS_BY_USER: {
      return {
        ...state,
        projectList: [...action.payload],
      };
    }
    default:
      return state;
  }
}
