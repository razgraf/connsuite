import { combineReducers } from "redux";
import { PURGE } from "redux-persist";
import { actions } from "../../constants";

const initialPortfolio = {
  networks: [],
};

const portfolio = (state = initialPortfolio, action) => {
  switch (action.type) {
    case actions.CHECK: {
      return { ...state, networks: action.payload.networks };
    }
    case PURGE:
      return {};

    default:
      return state;
  }
};

const dataReducer = combineReducers({
  portfolio,
});

export default dataReducer;
