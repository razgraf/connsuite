import { combineReducers } from "redux";
import { PURGE } from "redux-persist";
import { redux } from "../../constants";

const initialPortfolio = {
  networks: [],
};

const portfolio = (state = initialPortfolio, action) => {
  switch (action.type) {
    case redux.CHECK: {
      return { ...state, networks: action.payload.networks };
    }
    case PURGE:
      return initialPortfolio;

    default:
      return state;
  }
};

const dataReducer = combineReducers({
  portfolio,
});

export default dataReducer;
