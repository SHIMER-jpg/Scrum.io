import { GET_ALL_USERS, SET_USER } from "./constants.js";

const initialState = {
  users: [],
  loggedUser: {},
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_USERS: {
      return {
        ...state,
        users: action.payload.filter((u) => u._id !== state.loggedUser._id),
      };
    }
    case SET_USER: {
      return {
        ...state,
        loggedUser: action.payload,
      };
    }
    default:
      return state;
  }
}
