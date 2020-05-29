import { StateInputText, StateInputImage, StateInputTags, StateInputEditor } from "../../components/atoms/Input/state";

export const initial = {
  type: {
    value: null,
    error: null,
  },
  cover: { ...StateInputImage },
  title: { ...StateInputText },
  skills: { ...StateInputTags },
  categories: { ...StateInputTags },
  content: { ...StateInputEditor },
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
        ...state,
        type: {
          ...state.type,
          value: payload.type,
        },
        title: {
          ...state.title,
          value: payload.title,
        },
        skills: {
          ...state.skills,
          value: payload.skills,
        },
        categories: {
          ...state.categories,
          value: payload.categories,
        },
        content: {
          ...state.content,
          value: payload.content,
        },
        url: {
          ...state.url,
          value: payload.url,
        },
        cover: {
          ...state.cover,
          preview: payload.cover.preview,
        },
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
