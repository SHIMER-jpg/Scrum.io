import { combineReducers } from "redux";

import developerViewReducer from "./DeveloperView/reducer.js";
import managerViewReducer from "./ManagerView/reducer.js";
import homeReducer from "./Home/reducer";
import appReducer from "./App/reducer";
import viewRouter from "./ViewRouter/reducer";

const rootReducer = combineReducers({
  developerView: developerViewReducer,
  managerView: managerViewReducer,
  home: homeReducer,
  app: appReducer,
  viewRouter: viewRouter,
});

export default rootReducer;
