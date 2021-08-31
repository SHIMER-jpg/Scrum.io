//Hay que integrar todo lo que haya en reducer parts en un mismo reducer
import CONSTANTS from '../actions/constants/index.js';

const initialState = {
  projectTodos: [],
  userTodos: [],
  helpTodos: []
};

//De momento, los reducers no están modularizados en archivos distintos
export default function rootReducer(state = initialState, action){
  switch(action.type){
    case CONSTANTS.GET_USER_TODOS:
      return {
        ...state,
        userTodos: action.payload
      }
    case CONSTANTS.GET_HELP_TODOS:
      return {
        ...state,
        helpTodos: action.payload
      }
    default: return state
  }
}
