"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.policy = exports.limits = void 0;
const lodash_1 = __importDefault(require("lodash"));
const limits = __importStar(require("./atoms/limits"));
exports.limits = limits;
const article_1 = __importStar(require("./article"));
const network_1 = __importStar(require("./network"));
const user_1 = __importStar(require("./user"));
/**
 * Interpret the policy values for out atomic Inputs
 *
 * @param {function} gate
 * @param {*} value
 */
function interpret(gate, value) {
    if (lodash_1.default.isNil(value) || lodash_1.default.isEmpty(value))
        return null;
    if (!lodash_1.default.isFunction(gate))
        throw new Error("Gate Method is not a function");
    const result = gate(value);
    return result === true ? null : result;
}
const policy = {
    article: article_1.policy,
    user: user_1.policy,
    network: network_1.policy,
};
exports.policy = policy;
const guards = Object.assign(Object.assign(Object.assign({ interpret }, article_1.default), user_1.default), network_1.default);
exports.default = guards;
