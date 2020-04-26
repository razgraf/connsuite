export { default as HTTP_CODE } from "./httpcodes";

export const routes = {
  network: {
    root: "/networks",

    /** CRUD **/

    get: "/:id",
    create: "/",
    update: "/:id",
    remove: "/:id",

    /** CRUD BATCH */

    list: "/",
  },
  auth: {
    root: "/auth",
    /** PROVIDERS **/

    google: {
      root: "/google",
      redirect: "/google/redirect", // required by the old passport js implementation
    },
    facebook: {
      root: "/facebook",
    },
    linkedin: {
      root: "/linkedin",
    },
    twitter: {
      root: "/twitter",
    },
    local: {
      root: "/local",
    },

    /** UTILITY **/
    logout: "/logout",
    status: "/status",
  },
};

export const defaults = {
  username: "rockstar",
  description: "ConnSuite Rockstar",
};

const constants = {
  routes,
  defaults,
};

export default constants;
