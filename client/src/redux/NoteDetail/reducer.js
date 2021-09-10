import {
  GET_NOTES_DETAILS,
  CLEAR_NOTES,
  CREATE_NOTE,
  REMOVE_NOTE,
} from "./constants";

const initialState = {
  notes: [],
};

const NotesReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_NOTES_DETAILS:
      return {
        ...state,
        notes: action.payload,
      };
    case CREATE_NOTE:
      return {
        ...state,
        notes: [...state.notes, action.payload],
      };
    case CLEAR_NOTES:
      return {
        ...state,
        notes: [],
      };
    case REMOVE_NOTE:
      console.log(action.payload);
      return {
        ...state,
        notes: [...state.notes.filter((note) => note._id != action.payload)],
      };
    default:
      return state;
  }
};

export default NotesReducer;
