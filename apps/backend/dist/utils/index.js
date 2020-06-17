"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isSelf = exports.isShortId = exports.getUserAgent = void 0;
const lodash_1 = __importDefault(require("lodash"));
const shortid_1 = __importDefault(require("shortid"));
const constants_1 = require("../constants");
function getUserAgent(req) {
    let value = lodash_1.default.attempt(() => req.get("User-Agent"));
    if (lodash_1.default.isError(value) || lodash_1.default.isNil(value))
        value = constants_1.defaults.agent;
    return value;
}
exports.getUserAgent = getUserAgent;
function isShortId(id) {
    return !lodash_1.default.isNil(id) && shortid_1.default.isValid(id) && String(id).charAt(String(id).length - 1) === "_";
}
exports.isShortId = isShortId;
function isSelf(resource, res) {
    return (lodash_1.default.get(resource, "user._id") &&
        lodash_1.default.toString(lodash_1.default.get(res, "locals.identity.user")) === lodash_1.default.toString(lodash_1.default.get(resource, "user._id")));
}
exports.isSelf = isSelf;
