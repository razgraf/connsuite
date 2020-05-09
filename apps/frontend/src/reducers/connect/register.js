import _ from "lodash";
import { StateInputText, StateInputPassword } from "../../components/atoms/Input/state";

export const initial = {
  firstName: { ...StateInputText, value: "Van" },
  lastName: { ...StateInputText, value: "Software" },
  username: { ...StateInputText, value: "vansoftware" },
  email: { ...StateInputText, value: "vansoftwarero@gmail.com" },
  password: { ...StateInputPassword, value: "Anaaremerede1$" },
};

export const actions = {
  RESET: "RESET",
  UPDATE_FIRST_NAME: "UPDATE_FIRST_NAME",
  UPDATE_LAST_NAME: "UPDATE_LAST_NAME",
  UPDATE_USERNAME: "UPDATE_USERNAME",
  UPDATE_EMAIL: "UPDATE_EMAIL",
  UPDATE_PASSWORD: "UPDATE_PASSWORD",
};

export function reducer(state, { type, payload }) {
  switch (type) {
    case actions.RESET:
      return initial;
    case actions.UPDATE_FIRST_NAME:
      return {
        ...state,
        firstName: payload,
      };
    case actions.UPDATE_LAST_NAME:
      return {
        ...state,
        lastName: payload,
      };
    case actions.UPDATE_USERNAME:
      return {
        ...state,
        username: payload,
      };
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
