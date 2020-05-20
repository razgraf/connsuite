"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.policy = void 0;
/* eslint-disable @typescript-eslint/camelcase */ /* -- validator {require_protocol} -- */
const lodash_1 = __importDefault(require("lodash"));
const validator_1 = __importDefault(require("validator"));
const atoms_1 = require("./atoms");
exports.policy = {
    root: "Network must be valid",
    title: {
        root: `Titles must contain between ${atoms_1.limits.MIN_NETWORK_TITLE_LENGTH} and ${atoms_1.limits.MAX_NETWORK_TITLE_LENGTH} characters.`,
        1: `Please use between ${atoms_1.limits.MIN_NETWORK_TITLE_LENGTH} and ${atoms_1.limits.MAX_NETWORK_TITLE_LENGTH} characters for the title.`,
    },
    icon: {
        root: `Icons must be images (${atoms_1.limits.ALLOWED_NETWORK_ICON_FORMAT.join(", ")}) and must have a maximum size of ${atoms_1.limits.MAX_NETWORK_ICON_SIZE / (1024 * 1024)} MB.`,
        1: `Please use files that are images: (${atoms_1.limits.ALLOWED_NETWORK_ICON_FORMAT.join(", ")}).`,
        2: `Please use files smaller than ${atoms_1.limits.MAX_NETWORK_ICON_SIZE / (1024 * 1024)} MB.`,
        3: "Please add a file with a valid name.",
    },
    username: {
        root: `Usernames must contain between ${atoms_1.limits.MIN_NETWORK_USERNAME_LENGTH} and ${atoms_1.limits.MAX_NETWORK_USERNAME_LENGTH} characters.`,
        1: `Please use between ${atoms_1.limits.MIN_NETWORK_USERNAME_LENGTH} and ${atoms_1.limits.MAX_NETWORK_USERNAME_LENGTH} characters.`,
    },
    description: {
        root: `Descriptions can be empty or must contain between ${atoms_1.limits.MIN_NETWORK_DESCRIPTION_LENGTH} and ${atoms_1.limits.MAX_NETWORK_DESCRIPTION_LENGTH} characters.`,
        1: `Please use between ${atoms_1.limits.MIN_NETWORK_DESCRIPTION_LENGTH} and ${atoms_1.limits.MAX_NETWORK_DESCRIPTION_LENGTH} characters.`,
    },
    externalId: {
        root: "A network must be chosen (or created at step b.) in order to move to the next step.",
        1: "Please choose a valid network in order to proceed.",
        2: "Please choose an external network supported by us. If not, create a custom one.",
    },
    url: {
        root: "Websites and URLs have to contain http:// or https:// and be valid",
        1: "Please add http:// or https:// before your website or url.",
        2: "Please add a valid website or url.",
    },
};
function isNetworkTitleAcceptable(value, withPolicy = atoms_1.WITH_POLICY) {
    const [min, max] = [
        atoms_1.limits.MIN_NETWORK_TITLE_LENGTH,
        atoms_1.limits.MAX_NETWORK_TITLE_LENGTH,
    ];
    if (lodash_1.default.isNil(value) ||
        lodash_1.default.isEmpty(value) ||
        (!lodash_1.default.isString(value) && !lodash_1.default.isNumber(value)))
        return withPolicy ? exports.policy.title[1] : false;
    return value.length >= min && value.length <= max
        ? true
        : withPolicy
            ? exports.policy.title[1]
            : false;
}
function isNetworkUsernameAcceptable(value, withPolicy = atoms_1.WITH_POLICY) {
    const [min, max] = [
        atoms_1.limits.MIN_NETWORK_USERNAME_LENGTH,
        atoms_1.limits.MAX_NETWORK_USERNAME_LENGTH,
    ];
    if (lodash_1.default.isNil(value) ||
        lodash_1.default.isEmpty(value) ||
        (!lodash_1.default.isString(value) && !lodash_1.default.isNumber(value)))
        return withPolicy ? exports.policy.username[1] : false;
    return value.length >= min && value.length <= max
        ? true
        : withPolicy
            ? exports.policy.username[1]
            : false;
}
function isNetworkExternalIdAcceptable(value, withPolicy = atoms_1.WITH_POLICY, networks) {
    if (lodash_1.default.isNil(value) || lodash_1.default.isEmpty(value) || !lodash_1.default.isString(value))
        return withPolicy ? exports.policy.externalId[1] : false;
    if (!lodash_1.default.isNil(networks) &&
        Object.keys(networks).length > 0 &&
        !Object.keys(networks).includes(value))
        return withPolicy ? exports.policy.externalId[2] : false;
    return true;
}
function isNetworkIconAcceptable(value, withPolicy = atoms_1.WITH_POLICY, options) {
    if (options && options.vendor === "multer") {
        /** Server Side */
        const name = lodash_1.default.get(value, "originalname");
        const type = lodash_1.default.attempt(() => lodash_1.default.toString(value.mimetype).split("/").pop());
        const size = lodash_1.default.toNumber(lodash_1.default.get(value, "size"));
        if (lodash_1.default.isNil(name) || lodash_1.default.isEmpty(name) || !lodash_1.default.isString(name))
            return withPolicy ? exports.policy.icon[3] : false;
        if (lodash_1.default.isError(type) ||
            !atoms_1.limits.ALLOWED_NETWORK_ICON_FORMAT.includes(type || ""))
            return withPolicy ? exports.policy.icon[1] : false;
        if (lodash_1.default.isError(size) || size <= 0 || size > atoms_1.limits.MAX_NETWORK_ICON_SIZE)
            return withPolicy ? exports.policy.icon[2] : false;
        return true;
    }
    else {
        /** Client Side */
        const name = lodash_1.default.get(value, "name");
        const type = lodash_1.default.attempt(() => lodash_1.default.get(value, "type").split("/").pop());
        const size = lodash_1.default.toNumber(lodash_1.default.get(value, "size"));
        if (lodash_1.default.isNil(name) || lodash_1.default.isEmpty(name) || !lodash_1.default.isString(name))
            return withPolicy ? exports.policy.icon[3] : false;
        if (lodash_1.default.isError(type) ||
            !atoms_1.limits.ALLOWED_NETWORK_ICON_FORMAT.includes(type || ""))
            return withPolicy ? exports.policy.icon[1] : false;
        if (lodash_1.default.isError(size) || size <= 0 || size > atoms_1.limits.MAX_NETWORK_ICON_SIZE)
            return withPolicy ? exports.policy.icon[2] : false;
        return true;
    }
}
function isNetworkUrlAcceptable(value, withPolicy = atoms_1.WITH_POLICY) {
    if (lodash_1.default.isNil(value) || lodash_1.default.isEmpty(value) || !lodash_1.default.isString(value))
        return withPolicy ? exports.policy.url[2] : false;
    if (!(value.startsWith("https://") || value.startsWith("http://")))
        return withPolicy ? exports.policy.url[1] : false;
    return validator_1.default.isURL(value, { require_protocol: true })
        ? true
        : withPolicy
            ? exports.policy.url[2]
            : false;
}
function isNetworkDescriptionsAcceptable(value, withPolicy = atoms_1.WITH_POLICY) {
    const [min, max] = [
        atoms_1.limits.MIN_NETWORK_DESCRIPTION_LENGTH,
        atoms_1.limits.MAX_NETWORK_DESCRIPTION_LENGTH,
    ];
    if (lodash_1.default.isNil(value) || lodash_1.default.isEmpty(value) || !lodash_1.default.isString(value))
        return withPolicy ? exports.policy.description.root : false;
    return value.length >= min && value.length <= max
        ? true
        : withPolicy
            ? exports.policy.description[1]
            : false;
}
exports.default = {
    isNetworkTitleAcceptable,
    isNetworkIconAcceptable,
    isNetworkExternalIdAcceptable,
    isNetworkUsernameAcceptable,
    isNetworkUrlAcceptable,
    isNetworkDescriptionsAcceptable,
};
