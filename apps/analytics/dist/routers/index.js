"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("../constants");
const admin_1 = __importDefault(require("./admin"));
const visit_1 = __importDefault(require("./visit"));
exports.default = [
    { root: constants_1.routes.admin.root, router: admin_1.default },
    { root: constants_1.routes.visits.root, router: visit_1.default },
];
