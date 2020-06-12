import _ from "lodash";
import { combineReducers } from "redux";
import { PURGE, REHYDRATE } from "redux-persist";
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
    // case REHYDRATE:
    //   return initialHistory;
    case PURGE:
      return initialHistory;
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
    // case REHYDRATE:
    //   return initialCover;
    case PURGE:
      return initialCover;
    default:
      return state;
  }
};

const initialModal = {
  list: [],
};

const modal = (state = initialModal, { type, payload } = {}) => {
  switch (type) {
    case redux.MODAL_RESET: {
      return initialModal;
    }
    case redux.MODAL_REGISTER: {
      const { list } = state;
      if (!_.isNil(payload.id) && !list.find(item => item.id === _.get(payload, "id"))) list.push(payload);
      return {
        ...state,
        list,
      };
    }
    case redux.MODAL_UNREGISTER: {
      const { list } = state;
      if (!_.isNil(payload.id)) _.remove(list, item => item.id === payload.id);
      return {
        ...state,
        list,
      };
    }
    case redux.MODAL_OPEN: {
      return {
        ...state,
        list: state.list.map(item => (item.id === _.get(payload, "id") ? { ...item, isOpen: true } : item)),
      };
    }
    case redux.MODAL_CLOSE: {
      return {
        ...state,
        list: state.list.map(item => (item.id === _.get(payload, "id") ? { ...item, isOpen: false } : item)),
      };
    }

    // case REHYDRATE:
    //   return initialModal;
    case PURGE:
      return initialModal;
    default:
      return state;
  }
};

const viewReducer = combineReducers({
  cover,
  history,
  modal,
});

export default viewReducer;
