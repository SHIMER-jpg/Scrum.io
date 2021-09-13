import { SET_USER, SET_SOCKET } from "./constants.js";

const initialState = {
  loggedUser: {},
  socket: {},
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_USER: {
      return {
        ...state,
        loggedUser: action.payload,
      };
    }
    case SET_SOCKET:
      return {
        ...state,
        socket: action.payload,
      };
    default:
      return state;
  }
}
