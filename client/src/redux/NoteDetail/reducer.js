import {
  GET_NOTES_DETAILS,
  CLEAR_NOTES,
  CREATE_NOTE,
  REMOVE_NOTE,
  GET_TEAMCOMP,
} from "./constants";

const initialState = {
  notes: [],
  teamComp: [],
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

    case GET_TEAMCOMP:
      return {
        ...state,
        teamComp: action.payload,
      };
    case REMOVE_NOTE:
      return {
        ...state,
        notes: [...state.notes.filter((note) => note._id !== action.payload)],
      };
    default:
      return state;
  }
};

export default NotesReducer;
