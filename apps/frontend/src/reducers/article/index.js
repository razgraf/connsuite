import _ from "lodash";
import { StateInputText, StateInputImage, StateInputTags } from "../../components/atoms/Input/state";
import { types } from "../../constants";

export const initial = {
  type: {
    value: types.network.type.external,
    error: null,
  },
  cover: { ...StateInputImage },
  title: { ...StateInputText },
  skills: { ...StateInputTags },
  cateogries: { ...StateInputTags },
  content: { ...StateInputText }, // TODO EditorJs (?)
  url: { ...StateInputText },
};

export const actions = {
  BIND: "BIND",
  RESET: "RESET",
  UPDATE_TYPE: "UPDATE_TYPE",
  UPDATE_COVER: "UPDATE_COVER",
  UPDATE_COVER_PREVIEW: "UPDATE_COVER_PREVIEW",
  UPDATE_TITLE: "UPDATE_TITLE",
  UPDATE_SKILLS: "UPDATE_SKILLS",
  UPDATE_CATEGORIES: "UPDATE_CATEGORIES",
  UPDATE_CONTENT: "UPDATE_CONTENT",
  UPDATE_URL: "UPDATE_URL",
};

export function reducer(state, { type, payload }) {
  switch (type) {
    case actions.RESET:
      return initial;

    case actions.BIND:
      return {
        ...state, // TODO
      };
    case actions.UPDATE_TYPE:
      return {
        ...initial,
        type: payload,
      };
    case actions.UPDATE_COVER:
      return {
        ...state,
        cover: payload,
      };
    case actions.UPDATE_COVER_PREVIEW:
      return {
        ...state,
        cover: { ...state.cover, preview: payload },
      };
    case actions.UPDATE_TITLE:
      return {
        ...state,
        title: payload,
      };
    case actions.UPDATE_URL:
      return {
        ...state,
        url: payload,
      };
    case actions.UPDATE_CONTENT:
      return {
        ...state,
        content: payload,
      };
    case actions.UPDATE_SKILLS: {
      return {
        ...state,
        skills: payload,
      };
    }
    case actions.UPDATE_CATEGORIES:
      return {
        ...state,
        categories: payload,
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
