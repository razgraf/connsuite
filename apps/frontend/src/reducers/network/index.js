import _ from "lodash";
import { StateInputText, StateInputImage } from "../../components/atoms/Input/state";
import { types } from "../../constants";

export const initial = {
  type: {
    value: types.network.type.external,
    error: null,
  },
  title: { ...StateInputText },
  username: { ...StateInputText },
  description: { ...StateInputText },
  icon: { ...StateInputImage },
  url: { ...StateInputText },
  externalId: {
    value: null,
    error: null,
  },
};

export const actions = {
  BIND: "BIND",
  RESET: "RESET",
  UPDATE_TYPE: "UPDATE_TYPE",
  UPDATE_USERNAME: "UPDATE_USERNAME",
  UPDATE_TITLE: "UPDATE_TITLE",
  UPDATE_DESCRIPTION: "UPDATE_DESCRIPTION",
  UPDATE_URL: "UPDATE_URL",
  UPDATE_ICON: "UPDATE_ICON",
  UPDATE_ICON_PREVIEW: "UPDATE_ICON_PREVIEW",
  UPDATE_EXTERNAL_ID: "UPDATE_EXTERNAL_ID",
};

export function reducer(state, { type, payload }) {
  switch (type) {
    case actions.RESET:
      return initial;

    case actions.BIND:
      return {
        ...state,
        type: {
          ...state.type,
          value: payload.type,
        },
        title: {
          ...state.title,
          value: payload.title,
        },
        username: {
          ...state.username,
          value: payload.username,
        },
        description: {
          ...state.description,
          value: payload.description,
        },
        url: {
          ...state.url,
          value: payload.url,
        },
        icon: {
          ...state.icon,
          name: payload.icon.name,
          preview: payload.icon.preview,
        },
      };
    case actions.UPDATE_TYPE:
      return {
        ...initial,
        type: payload,
      };
    case actions.UPDATE_TITLE:
      return {
        ...state,
        title: payload,
      };
    case actions.UPDATE_USERNAME:
      return {
        ...state,
        username: payload,
      };
    case actions.UPDATE_DESCRIPTION:
      return {
        ...state,
        description: payload,
      };
    case actions.UPDATE_ICON:
      return {
        ...state,
        icon: payload,
      };
    case actions.UPDATE_ICON_PREVIEW:
      return {
        ...state,
        icon: { ...state.icon, preview: payload },
      };
    case actions.UPDATE_URL:
      return {
        ...state,
        url: payload,
      };
    case actions.UPDATE_EXTERNAL_ID:
      if (payload.extra) {
        const result = {
          ...state,
          externalId: payload,
        };
        return result;
      }
      return {
        ...state,
        externalId: payload,
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
