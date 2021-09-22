import axios from "axios";

import {
  SET_USER,
  SET_SOCKET,
  GET_NOTIFICATIONS,
  GET_USER_LANGUAGES,
  GET_ALL_NOTIFICATIONS,
  GET_USER_INFO,
  EDIT_USER_INFO,
} from "./constants";

const { REACT_APP_BACKEND_URL } = process.env;

// accion para setear los datos del usuario loggeado actualmente
// y que todos los componentes y views puedan acceder al mismo
export const setUser = (payload) => ({
  type: SET_USER,
  payload,
});

export const getUnreadNotificationsByUser = (userId) => {
  console.log("leyendo notificaciones de " + userId)
  return (dispatch) => {
    axios
      .get(
        `${REACT_APP_BACKEND_URL}/notification/user/${userId}?isReaded=false`
      )
      .then(({ data }) => {
        dispatch({ type: GET_NOTIFICATIONS, payload: data });
      });
  };
};

export const getUserInfo = (userId, setIsLoading) => {
  return (dispatch) => {
    axios
      .get(`${REACT_APP_BACKEND_URL}/user/userInfo/${userId}`)
      .then(({ data }) => {
        setIsLoading && setIsLoading(false);
        dispatch({ type: GET_USER_INFO, payload: data });
      });
  };
};

export const getUserLanguages = (username, setIsLoading) => {
  return (dispatch) => {
    axios
      .get(`${REACT_APP_BACKEND_URL}/user/languageStats/${username}`)
      .then(({ data }) => {
        setIsLoading && setIsLoading(false);
        const arrLanguages = [];

        for (const key in data) {
          arrLanguages.push({
            language: key,
            size: data[key].size,
            color: data[key].color,
          });
        }

        dispatch({ type: GET_USER_LANGUAGES, payload: arrLanguages });
      });
  };
};

export const editUserInfoFields = (userId, payload, setIsLoading) => {
  return (dispatch) => {
    axios
      .put(`${REACT_APP_BACKEND_URL}/user/userInfo/${userId}`, payload)
      .then(({ data }) => {
        setIsLoading && setIsLoading(false);

        dispatch({ type: EDIT_USER_INFO, payload: data });
      });
  };
};

export const getAllNotificationsByUser = (userId, setIsLoading) => {
  return (dispatch) => {
    axios
      .get(`${REACT_APP_BACKEND_URL}/notification/user/${userId}`)
      .then(({ data }) => {
        setIsLoading && setIsLoading(false);
        dispatch({ type: GET_ALL_NOTIFICATIONS, payload: data });
      });
  };
};

export const markNotificationsAsReaded = (userId) => {
  return (dispatch) => {
    axios
      .put(`${REACT_APP_BACKEND_URL}/notification/user/${userId}`)
      .then(() => {
        dispatch(getUnreadNotificationsByUser(userId));
      });
    // dispatch({ type: READ_NOTIFICATIONS }); // para reflejar el cambio en la UI en tiempo real.
  };
};

export const markOneNotificationAsReaded = (userId, notificationId) => {
  console.log("marcando como leidas....");
  return (dispatch) => {
    axios
      .put(
        `${REACT_APP_BACKEND_URL}/notification/user/${userId}/${notificationId}`
      )
      .then(() => {
        dispatch(getUnreadNotificationsByUser(userId));
      });
  };
};

export const setSocket = (socket) => ({ type: SET_SOCKET, payload: socket });
