import { combineReducers } from "redux";

import developerViewReducer from "./DeveloperView/DeveloperViewReducer";
import managerViewReducer from "./ManagerView/reducer.js";

const rootReducer = combineReducers({
  developerView: developerViewReducer,
  // Aca van agregando los siguientes reducers
  managerView: managerViewReducer,
});

export default rootReducer;
