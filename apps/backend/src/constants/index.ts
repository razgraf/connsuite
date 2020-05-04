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

    google: "/google",

    classic: {
      login: "/classic/login",
      register: "/classic/register",
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
