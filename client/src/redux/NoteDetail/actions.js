import axios from "axios";
import {
  GET_NOTES_DETAILS,
  CLEAR_NOTES,
  CREATE_NOTE,
  REMOVE_NOTE,
} from "./constants";
require("dotenv").config();
const { REACT_APP_BACKEND_HOST, REACT_APP_BACKEND_PORT } = process.env;

export function getNotesDetails(taskId) {
  return function (dispatch) {
    axios
      .get(
        `http://${REACT_APP_BACKEND_HOST}:${REACT_APP_BACKEND_PORT}/note/${taskId}`
      )
      .then((json) => {
        dispatch({ type: GET_NOTES_DETAILS, payload: json.data });
      });
  };
}

export function createNote(newNote) {
  return function (dispatch) {
    axios
      .post(
        `http://${REACT_APP_BACKEND_HOST}:${REACT_APP_BACKEND_PORT}/note/newNote`,
        newNote
      )
      .then((json) => {
        dispatch({ type: CREATE_NOTE, payload: json.data });
      })
      .catch((err) => {
        console.log(err);
      });
  };
}

export function removeNote(noteId) {
  return function (dispatch) {
    axios
      .delete(
        `http://${REACT_APP_BACKEND_HOST}:${REACT_APP_BACKEND_PORT}/note/${noteId}`
      )
      .then(dispatch({ type: REMOVE_NOTE, payload: noteId }));
  };
}

export function clearNotes() {
  return { type: CLEAR_NOTES };
}
