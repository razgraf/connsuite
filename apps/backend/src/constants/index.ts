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
      redirect: "/google/redirect",
    },
    facebook: {
      root: "/facebook",
      redirect: "/facebook/redirect",
    },
    linkedin: {
      root: "/linkedin",
      redirect: "/linkedin/redirect",
    },
    twitter: {
      root: "/twitter",
      redirect: "/twitter/redirect",
    },
    local: {
      root: "/local",
      redirect: "/local/redirect",
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
