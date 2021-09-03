import { combineReducers } from "redux";

import developerViewReducer from "./DeveloperView/reducer.js";
import managerViewReducer from "./ManagerView/reducer.js";
import homeReducer from "./Home/reducer";

const rootReducer = combineReducers({
  developerView: developerViewReducer,
  managerView: managerViewReducer,
  home: homeReducer,
});

export default rootReducer;
