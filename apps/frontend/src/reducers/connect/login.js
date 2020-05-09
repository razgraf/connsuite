import { StateInputText, StateInputPassword } from "../../components/atoms/Input/state";

export const initial = {
  email: StateInputText,
  password: StateInputPassword,
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

export default {
  actions,
  initial,
  reducer,
};
