import { combineReducers } from "redux";

import developerViewReducer from "./DeveloperView/DeveloperViewReducer";
import managerViewReducer from "./ManagerView/reducer.js";
import homeReducer from "./Home/reducer";

const rootReducer = combineReducers({
  developerView: developerViewReducer,
  // Aca van agregando los siguientes reducers
  managerView: managerViewReducer,
  home: homeReducer,
});

export default rootReducer;
