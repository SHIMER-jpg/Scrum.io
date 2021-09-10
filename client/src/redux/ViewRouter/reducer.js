import { GET_ROLE, CLEAR_ROLE } from "./constants.js";

const initialState = {
  userRole: null,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_ROLE: {
      return {
        ...state,
        userRole: action.payload,
      };
    }
    case CLEAR_ROLE: {
      return {
        userRole: null,
      };
    }
    default:
      return state;
  }
}
