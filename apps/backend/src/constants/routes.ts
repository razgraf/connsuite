export default {
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