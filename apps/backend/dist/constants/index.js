"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sizes = exports.defaults = void 0;
var atoms_1 = require("./atoms");
Object.defineProperty(exports, "atoms", { enumerable: true, get: function () { return atoms_1.default; } });
var routes_1 = require("./routes");
Object.defineProperty(exports, "routes", { enumerable: true, get: function () { return routes_1.default; } });
var http_1 = require("./http");
Object.defineProperty(exports, "HTTP_CODE", { enumerable: true, get: function () { return http_1.default; } });
var networks_1 = require("./networks");
Object.defineProperty(exports, "networks", { enumerable: true, get: function () { return networks_1.default; } });
const atoms_2 = require("../models/atoms");
exports.defaults = {
    agent: "Unknown",
    username: "rockstar",
    description: "Welcome to my online business card!",
    tagline: "Hello!",
    tier: {
        analytics: atoms_2.UserTier.Bronze,
    },
};
exports.sizes = {
    network: {
        icon: {
            WIDTH: 1000,
            HEIGHT: 1000,
        },
        thumbnail: {
            WIDTH: 400,
            HEIGHT: 400,
        },
    },
    user: {
        picture: {
            WIDTH: 1200,
            HEIGHT: 1200,
        },
        thumbnail: {
            WIDTH: 400,
            HEIGHT: 400,
        },
    },
    article: {
        cover: {
            WIDTH: 1400,
            HEIGHT: 700,
        },
        thumbnail: {
            WIDTH: 900,
            HEIGHT: 450,
        },
    },
};
