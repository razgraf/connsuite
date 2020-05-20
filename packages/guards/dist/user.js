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
    password: {
        root: `Passwords must contain at least ${atoms_1.limits.MIN_PASSWORD_LENGTH} charaters of which at least one uppercase letter, one lowercase letter, one digit and one special character (#?!@$%^&*-).`,
        1: `Please use At least ${atoms_1.limits.MIN_PASSWORD_LENGTH} characters (max ${atoms_1.limits.MAX_MASSWORD_LENGTH})`,
        2: "Please use 1 uppercase letter & 1 lowercase",
        3: "Please use at least 1 digit & 1 special sign",
    },
    name: {
        root: `Names must contain between ${atoms_1.limits.MIN_NAME_LENGTH} and ${atoms_1.limits.MAX_MASSWORD_LENGTH} characters.`,
        1: `Please use between ${atoms_1.limits.MIN_NAME_LENGTH} and ${atoms_1.limits.MAX_MASSWORD_LENGTH} characters.`,
    },
    username: {
        root: `Usernames must contain between ${atoms_1.limits.MIN_USERNAME_LENGTH} and ${atoms_1.limits.MAX_USERNAME_LENGTH} characters and must be unique.`,
        1: `Please use between ${atoms_1.limits.MIN_USERNAME_LENGTH} and ${atoms_1.limits.MAX_USERNAME_LENGTH} characters. Make it unique.`,
    },
    email: {
        root: "Emails must have a valid format. You will use it to gain access to your ConnSuite account.",
        1: "Please use a valid email",
    },
};
function isPasswordAcceptable(value, withPolicy = atoms_1.WITH_POLICY) {
    const [min, max] = [atoms_1.limits.MIN_PASSWORD_LENGTH, atoms_1.limits.MAX_MASSWORD_LENGTH];
    if (lodash_1.default.isNil(value) || lodash_1.default.isEmpty(value) || !lodash_1.default.isString(value))
        return withPolicy ? exports.policy.password[1] : false;
    if (value.length < min || value.length > max)
        return withPolicy ? exports.policy.password[1] : false;
    const uppercase = new RegExp("^(?=.*?[A-Z]).{1,}$");
    const lowercase = new RegExp("(?=.*?[a-z]).{1,}$");
    const digit = new RegExp("^(?=.*?[0-9]).{1,}$");
    const special = new RegExp("(?=.*?[#?!@$%^&*-])");
    if (!uppercase.test(value))
        return withPolicy ? exports.policy.password[2] : false;
    if (!lowercase.test(value))
        return withPolicy ? exports.policy.password[2] : false;
    if (!digit.test(value))
        return withPolicy ? exports.policy.password[3] : false;
    if (!special.test(value))
        return withPolicy ? exports.policy.password[3] : false;
    return true;
}
function isNameAcceptable(value, withPolicy = atoms_1.WITH_POLICY) {
    const [min, max] = [atoms_1.limits.MIN_NAME_LENGTH, atoms_1.limits.MAX_NAME_LENGTH];
    if (lodash_1.default.isNil(value) || lodash_1.default.isEmpty(value) || !lodash_1.default.isString(value))
        return withPolicy ? exports.policy.name[1] : false;
    return value.length >= min && value.length <= max ? true : withPolicy ? exports.policy.name[1] : false;
}
function isEmailAcceptable(value, withPolicy = atoms_1.WITH_POLICY) {
    if (lodash_1.default.isNil(value) || lodash_1.default.isEmpty(value) || !lodash_1.default.isString(value))
        return withPolicy ? exports.policy.email[1] : false;
    return validator_1.default.isEmail(value) ? true : withPolicy ? exports.policy.email[1] : false;
}
function isUsernameAcceptable(value, withPolicy = atoms_1.WITH_POLICY) {
    const [min, max] = [atoms_1.limits.MIN_USERNAME_LENGTH, atoms_1.limits.MAX_USERNAME_LENGTH];
    if (lodash_1.default.isNil(value) || lodash_1.default.isEmpty(value) || (!lodash_1.default.isString(value) && !lodash_1.default.isNumber(value)))
        return false;
    return value.length >= min && value.length <= max ? true : withPolicy ? exports.policy.username[1] : false;
}
exports.default = {
    isEmailAcceptable,
    isNameAcceptable,
    isPasswordAcceptable,
    isUsernameAcceptable,
};
