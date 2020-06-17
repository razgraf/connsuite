"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.configs = exports.tree = exports.root = exports.host = void 0;
exports.host = {
    development: `http://localhost:${process.env.PORT || 3002}`,
    staging: "https://www.staging.api.connsuite.com",
    production: "https://www.api.connsuite.com",
};
exports.root = exports.host[process.env.NODE_ENV || "development"];
exports.tree = {
    article: "public/data/article",
    externalNetwork: "public/static/network",
    internalNetwork: "public/data/network",
    user: "public/data/user",
};
exports.configs = {
    WITH_POLICY: false,
};
exports.default = {
    host: exports.host,
    root: exports.root,
    tree: exports.tree,
    configs: exports.configs,
};
