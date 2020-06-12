import _ from "lodash";
import { combineReducers } from "redux";
import { PURGE } from "redux-persist";
import { redux } from "../../constants";

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
    case redux.AUTH_USER_SET: {
      const payload = _.isObject(action, "payload") ? _.get(action, "payload") : {};
      const data = { ...initialUser, ...payload };

      return { ...state, ...data };
    }
    case PURGE:
      return initialUser;

    default:
      return state;
  }
};

const initalToken = {
  value: null,
};

const token = (state = initalToken, action) => {
  switch (action.type) {
    case redux.AUTH_TOKEN_SET: {
      return { ...state, ...action.payload };
    }
    case PURGE:
      return initalToken;

    default:
      return state;
  }
};

const authReducer = combineReducers({
  user,
  token,
});

export default authReducer;
