import status from "./httpcodes";

export { status };

export const pages = {
  landing: {
    root: "/",
  },
  profile: {
    root: "/:id",
  },
  dashboard: {
    root: "/dashboard",
  },
};

export const subpages = {};

export const vendors = {};

export const redux = {
  SET: "SET",
  CHECK: "CHECK",

  AUTH_USER_SET: "AUTH_USER_SET",
  AUTH_TOKEN_SET: "AUTH_TOKEN_SET",
};

export const sagas = {
  TEST: "TEST",
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
  redux,
  pages,
  subpages,
  types,
  sagas,
  status,
  vendors,
};

export default constants;
