import { Route } from "../models";

export const routes: { [key: string]: Route } = {
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
};

const constants = {
  routes,
};

export default constants;
