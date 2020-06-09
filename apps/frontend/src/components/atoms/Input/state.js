export const StateInputText = {
  value: "",
  error: null,
};

export const StateInputPassword = {
  value: "",
  error: null,
};

export const StateInputImage = {
  value: null,
  name: null,
  preview: null,
  error: null,
};

export const StateInputTags = {
  value: [],
  error: null,
};

export const StateInputEditor = {
  value: null,
  error: null,
};

export const StateInputDate = {
  value: {
    day: null,
    month: null,
    year: null,
    label: null,
  },
  error: null,
};

const state = {
  StateInputText,
  StateInputPassword,
  StateInputImage,
  StateInputTags,
  StateInputEditor,
  StateInputDate,
};

export default state;
