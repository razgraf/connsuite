import { StateInputText, StateInputImage } from "../../components/atoms/Input/state";

export const initial = {
  picture: { ...StateInputImage },
  firstName: { ...StateInputText },
  lastName: { ...StateInputText },
  description: { ...StateInputText },
};

export const actions = {
  BIND: "BIND",
  RESET: "RESET",

  UPDATE_PICTURE: "UPDATE_PICTURE",
  UPDATE_PICTURE_PREVIEW: "UPDATE_PICTURE_PREVIEW",

  UPDATE_FIRST_NAME: "UPDATE_FIRST_NAME",
  UPDATE_LAST_NAME: "UPDATE_LAST_NAME",

  UPDATE_DESCRIPTION: "UPDATE_DESCRIPTION",
};

export function reducer(state, { type, payload }) {
  switch (type) {
    case actions.RESET:
      return initial;

    case actions.BIND:
      return {
        ...state,
        picture: {
          ...state.picture,
          preview: payload.picture.preview,
        },
        firstName: {
          ...state.firstName,
          value: payload.firstName,
        },
        lastName: {
          ...state.lastName,
          value: payload.lastName,
        },
        description: {
          ...state.description,
          value: payload.description,
        },
      };
    case actions.UPDATE_PICTURE:
      return {
        ...state,
        picture: payload,
      };
    case actions.UPDATE_PICTURE_PREVIEW:
      return {
        ...state,
        picture: { ...state.picture, preview: payload },
      };
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
    case actions.UPDATE_DESCRIPTION:
      return {
        ...state,
        description: payload,
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
