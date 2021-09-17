import { GET_MESSAGES } from "./constants";

const initialState = {
  messages: [],
};

export default function chatReducer(state = initialState, action) {
  switch (action.type) {
    case GET_MESSAGES:
      return {
        ...state,
        messages: action.payload,
      };
    case "UPDATE_MESSAGE":
      return {
        ...state,
        messages: [...state.messages, action.payload],
      };
    case "CLEAR_MESSAGE":
      console.log("hola");
      return {
        messages: [],
      };

    default:
      return state;
  }
}
