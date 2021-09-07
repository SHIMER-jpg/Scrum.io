import { CONSTANTS } from "./constants.js";



export function change (payload){
    return {
        type: CONSTANTS.CHANGE, payload: payload
    }
}