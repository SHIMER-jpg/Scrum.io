import {
  SET_USER,
  SET_SOCKET,
  GET_NOTIFICATIONS,
  READ_NOTIFICATIONS,
} from "./constants.js";

const initialState = {
  loggedUser: {},
  socket: {},
  notifications: [],
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
    default:
      return state;
  }
}
