"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.toISODate = exports.isISODate = exports.getUserAgent = void 0;
const lodash_1 = __importDefault(require("lodash"));
const dayjs_1 = __importDefault(require("dayjs"));
const constants_1 = require("../constants");
function getUserAgent(req) {
    let value = lodash_1.default.attempt(() => req.get("User-Agent"));
    if (lodash_1.default.isError(value) || lodash_1.default.isNil(value))
        value = constants_1.defaults.agent;
    return value;
}
exports.getUserAgent = getUserAgent;
function isISODate(source) {
    if (lodash_1.default.isNil(source))
        return false;
    const interpreted = lodash_1.default.attempt(() => dayjs_1.default(source).toISOString());
    return !lodash_1.default.isError(interpreted);
}
exports.isISODate = isISODate;
function toISODate(source) {
    if (lodash_1.default.isNil(source))
        return null;
    const interpreted = lodash_1.default.attempt(() => dayjs_1.default(source).toISOString());
    return !lodash_1.default.isError(interpreted) ? interpreted : null;
}
exports.toISODate = toISODate;
