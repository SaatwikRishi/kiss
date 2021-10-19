
import { combineReducers } from "redux";

import userReducer from './userReducer.js'
import dashboardReducer from "./dashboardReducer";
import categoryReducer from "./categoryReducer";
import stdcategoryReducer from "./stdcategoryReducer";


const rootReducer = combineReducers({
    user: userReducer,
    dashboard:dashboardReducer,
    category:categoryReducer,
    stdcategory:stdcategoryReducer,
});

export default rootReducer; 