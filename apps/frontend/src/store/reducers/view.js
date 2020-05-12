import { combineReducers } from "redux";
import { PURGE } from "redux-persist";
import { redux } from "../../constants";

const initialHistory = [];

const history = (state = initialHistory, { type, payload } = {}) => {
  switch (type) {
    case redux.HISTORY_PUSH: {
      state.push(payload);
      return state;
    }
    case redux.HISTORY_POP: {
      if (state.length) state.pop();
      return state;
    }
    case redux.HISTORY_CLEAR: {
      return [];
    }
    default:
      return state;
  }
};

const initialCover = {
  cover: {
    isOpen: false,
    network: null,
  },
};

const cover = (state = initialCover, { type, payload } = {}) => {
  switch (type) {
    case redux.COVER_OPEN: {
      return { ...state, isOpen: true };
    }
    case redux.COVER_CLOSE: {
      return { ...state, isOpen: false };
    }
    case redux.COVER_TOGGLE: {
      return { ...state, isOpen: !state.isOpen };
    }
    case redux.COVER_NETWORK_SET: {
      return { ...state, network: payload.network };
    }
    case redux.COVER_NETWORK_CLEAR: {
      return { ...state, network: payload.network };
    }
    case PURGE:
      return initialCover;

    default:
      return state;
  }
};

const viewReducer = combineReducers({
  cover,
  history,
});

export default viewReducer;
