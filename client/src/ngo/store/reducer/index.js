
import { combineReducers } from "redux";

import userReducer from './userReducer.js'
import dashboardReducer from "./dashboardReducer";
import categoryReducer from "./categoryReducer";

const rootReducer = combineReducers({
    user: userReducer,
    dashboard:dashboardReducer,
    category:categoryReducer,
});

export default rootReducer; 