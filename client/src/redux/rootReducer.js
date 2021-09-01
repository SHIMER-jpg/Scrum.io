import { combineReducers } from "redux";

import developerViewReducer from './DeveloperView/DeveloperViewReducer';

const rootReducer = combineReducers({
    developerView: developerViewReducer,
    // Aca van agregando los siguientes reducers
});

export default rootReducer;
