import {
  SET_USER,
  SET_SOCKET,
  GET_NOTIFICATIONS,
  READ_NOTIFICATIONS,
  GET_ALL_NOTIFICATIONS,
  GET_USER_LANGUAGES,
  GET_USER_INFO,
} from "./constants.js";

const initialState = {
  loggedUser: {},
  socket: {},
  notifications: [], // unread notifications
  allNotifications: [],
  userInfo: {},
  darkMode: Boolean(localStorage.getItem("darkMode"))
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_USER: {
      return {
        ...state,
        loggedUser: action.payload,
      };
    }
    case SET_SOCKET:
      return {
        ...state,
        socket: action.payload,
      };
    case GET_NOTIFICATIONS: {
      return {
        ...state,
        notifications: action.payload.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        ),
      };
    }
    case READ_NOTIFICATIONS: {
      return {
        ...state,
        notifications: state.notifications.map((n) => {
          n.readed = true;
          return n;
        }),
      };
    }
    case GET_USER_INFO:
      return {
        ...state,
        userInfo: action.payload,
      };
    case GET_USER_LANGUAGES: {
      return {
        ...state,
        userInfo: {
          ...state.userInfo,
          languages: action.payload
        }
      }
    }
    case GET_ALL_NOTIFICATIONS: {
      return {
        ...state,
        allNotifications: action.payload.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        ),
      };
    }
    case "SET_DARK_MODE": {
      return {
        ...state,
        darkMode: action.payload
      }
    }
    default:
      return state;
  }
}
