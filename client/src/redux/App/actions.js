import { SET_USER, SET_SOCKET } from "./constants";

// accion para setear los datos del usuario loggeado actualmente
// y que todos los componentes y views puedan acceder al mismo
export const setUser = (payload) => ({
  type: SET_USER,
  payload,
});

export const setSocket = (socket) => ({ type: SET_SOCKET, payload: socket });
