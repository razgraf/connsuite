export default {
  admin: {
    root: "/admin", //TODO REMOVE THIS IN PRODUCTION
  },
  visits: {
    root: "/visits",
    get: "/:id",
    create: "/",
    list: "/",
  },
};
