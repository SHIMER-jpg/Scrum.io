import { CONSTANTS } from "./constants";

const initialState = {
  dates: [],
};

const calendary = (state = initialState, action) => {
  switch (action.type) {
    case CONSTANTS.GET_DATES: {
      return {
        ...state,
        dates: action.payload,
      };
    }
    case CONSTANTS.POST_DATE: {
      console.log(action.payload);
      return {
        ...state,
        dates: [...state.dates, action.payload],
      };
    }
    default:
      return state;
  }
};

export default calendary;
