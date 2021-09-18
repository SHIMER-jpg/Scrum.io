import axios from "axios";
import {
  GET_NOTES_DETAILS,
  CLEAR_NOTES,
  CREATE_NOTE,
  REMOVE_NOTE,
  GET_TEAMCOMP,
} from "./constants";
require("dotenv").config();
const { REACT_APP_BACKEND_URL } = process.env;

export function getNotesDetails(taskId) {
  return function (dispatch) {
    axios.get(`${REACT_APP_BACKEND_URL}/note/${taskId}`).then((json) => {
      dispatch({ type: GET_NOTES_DETAILS, payload: json.data });
    });
  };
}

export function createNote(newNote) {
  return function (dispatch) {
    axios
      .post(`${REACT_APP_BACKEND_URL}/note/newNote`, newNote)
      .then((json) => {
        dispatch({ type: CREATE_NOTE, payload: json.data });
      })
      .catch((err) => {
        console.log(err);
      });
  };
}

export function getTeamComp(projectId) {
  return function (dispatch) {
    axios
      .get(`${REACT_APP_BACKEND_URL}/project/teamComp/${projectId}`)
      .then((json) => {
        console.log("data: ", json.data);
        dispatch({ type: GET_TEAMCOMP, payload: json.data });
      })
      .catch((err) => {
        console.log(err);
      });
  };
}

export function removeNote(noteId) {
  return function (dispatch) {
    axios
      .delete(`${REACT_APP_BACKEND_URL}/note/${noteId}`)
      .then(dispatch({ type: REMOVE_NOTE, payload: noteId }));
  };
}

export function clearNotes() {
  return { type: CLEAR_NOTES };
}
