import _ from "lodash";
import { combineReducers } from "redux";
import { PURGE } from "redux-persist";
import { actions } from "../../constants";

const initialUser = {
  description: null,
  usernames: null,
  name: {
    first: null,
    last: null,
  },
  tier: null,
};

const user = (state = initialUser, action) => {
  switch (action.type) {
    case actions.AUTH_USER_SET: {
      const data = { ...initialUser };
      data.description = _.get(action.payload, "description");
      data.usernames = _.get(action.payload, "usernames") || [];
      data.name.first = _.get(action.payload, "name.first");
      data.name.last = _.get(action.payload, "name.last");
      data.tier = _.get(action.payload, "tier");

      return { ...state, ...data };
    }
    case PURGE:
      return {};

    default:
      return state;
  }
};

const initalToken = {
  value: null,
};

const token = (state = initalToken, action) => {
  switch (action.type) {
    case actions.AUTH_TOKEN_SET: {
      console.log(action.payload);
      return { ...state, ...action.payload };
    }
    case PURGE:
      return {};

    default:
      return state;
  }
};

const authReducer = combineReducers({
  user,
  token,
});

export default authReducer;
