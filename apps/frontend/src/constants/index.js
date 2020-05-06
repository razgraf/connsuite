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
  authStatus: () => `${API.root}/auth/status`,
  authRegister: () => `${API.root}/auth/classic/register`,
  authLogin: () => `${API.root}/auth/classic/login`,
  authLogout: () => `${API.root}/auth/logout`,
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
