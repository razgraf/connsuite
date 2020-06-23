"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaults = void 0;
var atoms_1 = require("./atoms");
Object.defineProperty(exports, "atoms", { enumerable: true, get: function () { return atoms_1.default; } });
var routes_1 = require("./routes");
Object.defineProperty(exports, "routes", { enumerable: true, get: function () { return routes_1.default; } });
var http_1 = require("./http");
Object.defineProperty(exports, "HTTP_CODE", { enumerable: true, get: function () { return http_1.default; } });
const atoms_2 = require("../models/atoms");
exports.defaults = {
    agent: "Unknown",
    tier: {
        analytics: atoms_2.UserTier.Bronze,
    },
};
