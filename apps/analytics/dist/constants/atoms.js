"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dependency = exports.root = exports.backend = exports.host = void 0;
exports.host = {
    development: `http://localhost:${process.env.PORT || 3005}`,
    staging: "https://www.staging.analytics.connsuite.com",
    production: "https://www.analytics.connsuite.com",
};
exports.backend = {
    development: `http://localhost:3002`,
    staging: "https://www.staging.api.connsuite.com",
    production: "https://www.api.connsuite.com",
};
const NODE_ENV = process.env.NODE_ENV || "development";
exports.root = exports.host[NODE_ENV];
exports.dependency = {
    backend: {
        root: exports.backend[NODE_ENV],
        status: `${exports.backend[NODE_ENV]}/auth/status`,
    },
};
exports.default = {
    dependency: exports.dependency,
    host: exports.host,
    root: exports.root,
};
