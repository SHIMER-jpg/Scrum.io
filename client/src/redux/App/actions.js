import axios from "axios";

import { SET_USER, SET_SOCKET, GET_NOTIFICATIONS, READ_NOTIFICATIONS } from "./constants";

const { REACT_APP_BACKEND_URL } = process.env;

// accion para setear los datos del usuario loggeado actualmente
// y que todos los componentes y views puedan acceder al mismo
export const setUser = (payload) => ({
  type: SET_USER,
  payload,
});

export const getNotificationsByUser = (userId) => {
  console.log("dispachando....")
  return (dispatch) => {
    axios
      .get(`${REACT_APP_BACKEND_URL}/notification/user/${userId}`)
      .then(({ data }) => {
        console.log({data})
        dispatch({ type: GET_NOTIFICATIONS, payload: data });
      });
  };
};

export const markNotificationsAsReaded = (userId) => {
  console.log("marcando como leidas....")
  return (dispatch) => {
    axios
      .put(`${REACT_APP_BACKEND_URL}/notification/user/${userId}`)
      .then(() => {
        dispatch(getNotificationsByUser(userId));
      });
  };
};

export const markOneNotificationAsReaded = (userId, notificationId) => {
  console.log("marcando como leidas....")
  return (dispatch) => {
    axios
      .put(`${REACT_APP_BACKEND_URL}/notification/user/${userId}/${notificationId}`)
      .then(() => {
        dispatch(getNotificationsByUser(userId));
      });
  };
};


export const setSocket = (socket) => ({ type: SET_SOCKET, payload: socket });
