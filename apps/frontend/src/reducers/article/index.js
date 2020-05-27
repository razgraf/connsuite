import _ from "lodash";
import { StateInputText, StateInputImage, StateInputTags } from "../../components/atoms/Input/state";
import { types } from "../../constants";

export const initial = {
  type: {
    value: types.network.type.external,
    error: null,
  },
  icon: { ...StateInputImage },
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
  UPDATE_ICON: "UPDATE_ICON",
  UPDATE_ICON_PREVIEW: "UPDATE_ICON_PREVIEW",
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
        skills: payload,
      };
    default:
      throw new Error("Unknown Action");
  }
}

export const helper = {
  isValid: state => {
    try {
      if (state.type.value === types.network.type.external) {
        return [state.externalId, state.username].every(item => {
          const value = _.get(item, "value");
          const error = _.get(item, "error");
          return !_.isNil(value) && !_.isEmpty(value) && _.isNil(error);
        });
      } else {
        return [state.title, state.icon, state.username, state.url].every(item => {
          const value = _.get(item, "value");
          const error = _.get(item, "error");
          return !_.isNil(value) && !_.isEmpty(value) && _.isNil(error);
        });
      }
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
