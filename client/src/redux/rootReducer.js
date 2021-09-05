import { combineReducers } from "redux";

import developerViewReducer from "./DeveloperView/reducer.js";
import managerViewReducer from "./ManagerView/reducer.js";
import homeReducer from "./Home/reducer";
import appReducer from "./App/reducer";
import viewRouter from "./ViewRouter/reducer";
import NotesReducer from "./NoteDetail/reducer.js";

const rootReducer = combineReducers({
  developerView: developerViewReducer,
  managerView: managerViewReducer,
  home: homeReducer,
  app: appReducer,
  viewRouter: viewRouter,
  NotesReducer: NotesReducer,
});

export default rootReducer;
