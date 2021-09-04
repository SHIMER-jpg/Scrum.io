import { GET_ROLE } from "./constants.js";

const initialState = {
  userRole: {},
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_ROLE: {
      return {
        ...state,
        userRole: action.payload,
      };
    }
    default:
      return state;
  }
}
