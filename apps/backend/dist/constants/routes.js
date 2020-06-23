"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    admin: {
        root: "/admin" /* For testing purposes, not available in production */,
    },
    article: {
        root: "/articles",
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
    category: {
        root: "/categories",
        listDefault: "/default",
    },
    network: {
        root: "/networks",
        /** CRUD **/
        get: "/:id",
        create: "/",
        update: "/:id",
        remove: "/:id",
        /** CRUD BATCH */
        list: "/",
        listExternal: "/external/",
    },
    skill: {
        root: "/skills",
        listDefault: "/default",
    },
    user: {
        root: "/users",
        get: "/:id",
        update: "/:id",
        listSkillsAndCategories: "/:id/skills-and-categories",
    },
};