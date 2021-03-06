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
import axios from "axios";
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

//------------- ADVERTISEMENTS -----------------------------------------------

export function getAdvertisementsByProjectId(projectId, setIsLoading) {
  return function (dispatch) {
    axios
      .get(`${REACT_APP_BACKEND_URL}/advertisement/${projectId}`)
      .then((json) => {
        setIsLoading && setIsLoading(false);
        dispatch({ type: GET_ADVERTISEMENTS, payload: json.data });
      })
      .catch((err) => {
        console.log(err);
      });
  };
}

export function createAdvertisement(newAdvertisement) {
  return function (dispatch) {
    axios
      .post(
        `${REACT_APP_BACKEND_URL}/advertisement/createAdvertisement`,
        newAdvertisement
      )
      .then((json) => {
        dispatch({ type: CREATE_ADVERTISEMENT, payload: json.data });
      })
      .catch((err) => {
        console.log(err);
      });
  };
}

export function deleteAdvertisement(advertisementId) {
  return function (dispatch) {
    axios
      .delete(`${REACT_APP_BACKEND_URL}/advertisement/${advertisementId}`)
      .then(dispatch({ type: DELETE_ADVERTISEMENT, payload: advertisementId }));
  };
}

export function clearAdvertisements() {
  return { type: CLEAR_ADVERTISEMENTS };
}
