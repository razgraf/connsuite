import { combineReducers } from "redux";

import authReducer from "./auth";
import portfolioReducer from "./portfolio";
import resourceReducer from "./resource";
import viewReducer from "./view";

const rootReducer = combineReducers({
  auth: authReducer,
  portfolio: portfolioReducer,
  resource: resourceReducer,
  view: viewReducer,
});

export default rootReducer;
