import CONSTANTS from "./constants";

const initialState = {
  sequence: [0, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89],
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case CONSTANTS.CHANGE:
      return {
        ...state,
        sequence: action.payload.split(","),
      };
    default:
      return state;
  }
}
