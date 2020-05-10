import _ from "lodash";
import { StateInputText, StateInputPassword } from "../../components/atoms/Input/state";

export const initial = {
  email: { ...StateInputText },
  password: { ...StateInputPassword },
};

export const actions = {
  RESET: "RESET",
  UPDATE_EMAIL: "UPDATE_EMAIL",
  UPDATE_PASSWORD: "UPDATE_PASSWORD",
};

export function reducer(state, { type, payload }) {
  switch (type) {
    case actions.RESET:
      return initial;
    case actions.UPDATE_EMAIL:
      return {
        ...state,
        email: payload,
      };
    case actions.UPDATE_PASSWORD:
      return {
        ...state,
        password: payload,
      };
    default:
      throw new Error("Unknown Action");
  }
}

export const helper = {
  isValid: state => {
    try {
      return Object.values(state).every(item => {
        const value = _.get(item, "value");
        const error = _.get(item, "error");
        return !_.isNil(value) && !_.isEmpty(value) && _.isNil(error);
      });
    } catch (e) {
      return false;
    }
  },
};

export default {
  actions,
  helper,
  initial,
  reducer,
};