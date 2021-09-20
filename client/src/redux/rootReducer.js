import { combineReducers } from "redux";

import developerViewReducer from "./DeveloperView/reducer.js";
import managerViewReducer from "./ManagerView/reducer.js";
import homeReducer from "./Home/reducer";
import appReducer from "./App/reducer";
import viewRouter from "./ViewRouter/reducer";
import NotesReducer from "./NoteDetail/reducer.js";
import pokerplanning from "../redux/PokerPlanning/reducer";
import teamCompReducer from "../redux/TeamComposition/reducer";

const rootReducer = combineReducers({
  developerView: developerViewReducer,
  managerView: managerViewReducer,
  home: homeReducer,
  app: appReducer,
  viewRouter: viewRouter,
  NotesReducer: NotesReducer,
  pokerplanning: pokerplanning,
  teamCompReducer: teamCompReducer,
});

export default rootReducer;
