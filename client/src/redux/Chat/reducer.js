import { GET_MESSAGES } from "./constants";

const initialState = {
  messages: [],
  messageQuantity: 0,
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
      return {
        ...state,
        messages: [],
      };
    case "SAVE_LENGTH":
      return {
        ...state,
        messageQuantity: action.payload,
      };

    default:
      return state;
  }
}
