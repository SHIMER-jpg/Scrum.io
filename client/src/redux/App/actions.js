import { SET_USER } from "./constants";

// accion para setear los datos del usuario loggeado actualmente
// y que todos los componentes y views puedan acceder al mismo
export const setUser = (payload) => ({
    type: SET_USER,
    payload,
});