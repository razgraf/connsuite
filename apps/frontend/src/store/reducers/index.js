import { combineReducers } from "redux";

import authReducer from "./auth";
import dataReducer from "./data";
import viewReducer from "./view";

const rootReducer = combineReducers({
  auth: authReducer,
  data: dataReducer,
  view: viewReducer,
});

export default rootReducer;
