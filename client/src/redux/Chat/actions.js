import axios from "axios";

import { GET_MESSAGES, CREATE_MESSAGES } from "./constants.js";

require("dotenv").config();
const { REACT_APP_BACKEND_URL } = process.env;

export function getMessages(projectId) {
  return function (dispatch) {
    axios
      .get(`${REACT_APP_BACKEND_URL}/message/getMessages/${projectId}`)
      .then((json) => {
        dispatch({ type: GET_MESSAGES, payload: json.data });
      });
  };
}

export function createMessage(userId, projectId, content) {
  return function (dispatch) {
    axios
      .post(`${REACT_APP_BACKEND_URL}/message/newMessage`, {
        userId,
        projectId,
        content,
      })
      .then((json) => {
        return json.data;
      });
  };
}

export function updateMessage(message) {
  return { type: "UPDATE_MESSAGE", payload: message };
}

export function clearMessages() {
  return { type: "CLEAR_MESSAGE" };
}

export function saveLength(payload) {
  console.log(payload);
  return { type: "SAVE_LENGTH", payload: payload };
}
