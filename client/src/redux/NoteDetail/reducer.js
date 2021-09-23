import {
  GET_NOTES_DETAILS,
  CLEAR_NOTES,
  CREATE_NOTE,
  REMOVE_NOTE,
  GET_ADVERTISEMENTS,
  CREATE_ADVERTISEMENT,
  DELETE_ADVERTISEMENT,
  CLEAR_ADVERTISEMENTS,
} from "./constants";

const initialState = {
  notes: [],
  advertisements: [],
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
      return {
        ...state,
        notes: [...state.notes.filter((note) => note._id !== action.payload)],
      };
    //------------------- ADVERTISEMENTS ------------------------------------
    case GET_ADVERTISEMENTS:
      return {
        ...state,
        advertisements: action.payload,
      };
    case CREATE_ADVERTISEMENT:
      return {
        ...state,
        advertisements: [...state.advertisements, action.payload],
      };
    case DELETE_ADVERTISEMENT:
      return {
        ...state,
        advertisements: [
          ...state.advertisements.filter((ad) => ad._id !== action.payload),
        ],
      };
    case CLEAR_ADVERTISEMENTS:
      return {
        ...state,
        advertisements: [],
      };
    default:
      return state;
  }
};

export default NotesReducer;
