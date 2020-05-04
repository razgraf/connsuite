import status from "./httpcodes";

export { status };

export const pages = {
  landing: {
    root: "/",
  },
};

export const subpages = {};

export const vendors = {};

export const actions = {
  SET: "SET",
};

export const types = {
  nav: {
    platform: "platform",
    presentation: "presentation",
  },
};

export const API = {
  root: "http://localhost:3002",
  authGoogle: () => `${API.root}/auth/google`,
};

const constants = {
  API,
  actions,
  pages,
  subpages,
  types,
  status,
  vendors,
};

export default constants;
