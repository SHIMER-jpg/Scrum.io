import { SET_USER } from "./constants.js";

const initialState = {
  loggedUser: {},
};

export default function reducer(state = initialState, action) {
    switch (action.type) {
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