import { StateInputDate } from "../../../components/atoms/Input/state";

export const initial = {
  from: { ...StateInputDate },
  to: { ...StateInputDate },
};

export const actions = {
  BIND: "BIND",
  RESET: "RESET",
  UPDATE_FROM_VALUE: "UPDATE_FROM_VALUE",
  UPDATE_FROM_ERROR: "UPDATE_FROM_ERROR",
  UPDATE_TO_VALUE: "UPDATE_TO_VALUE",
  UPDATE_TO_ERROR: "UPDATE_TO_ERROR",
};

export function reducer(state, { type, payload }) {
  switch (type) {
    case actions.RESET:
      return initial;

    case actions.BIND:
      return {
        ...state,
        from: {
          ...state.from,
          value: payload.from,
        },
        to: {
          ...state.to,
          value: payload.to,
        },
      };
    case actions.UPDATE_FROM_VALUE:
      return {
        ...state,
        from: {
          ...state.from,
          value: payload,
        },
      };
    case actions.UPDATE_FROM_ERROR:
      return {
        ...state,
        from: {
          ...state.from,
          error: payload,
        },
      };

    case actions.UPDATE_TO_VALUE:
      return {
        ...state,
        to: {
          ...state.to,
          value: payload,
        },
      };
    case actions.UPDATE_TO_ERROR:
      return {
        ...state,
        to: {
          ...state.to,
          error: payload,
        },
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
