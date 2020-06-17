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
const limits_1 = require("./atoms/limits");
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
        2: `Please use only letters, digits, ., - or _.`,
        3: "Some usernames are protected or already in use. Please try another one. Make it unique.",
    },
    email: {
        root: "Emails must have a valid format. You will use it to gain access to your ConnSuite account.",
        1: "Please use a valid email",
    },
    picture: {
        root: `The picture must be an image (${atoms_1.limits.ALLOWED_USER_PICTURE_FORMAT.join(", ")}) and must have a maximum size of ${atoms_1.limits.MAX_USER_PICTURE_SIZE / (1024 * 1024)} MB.`,
        1: `Please use files that are images: (${atoms_1.limits.ALLOWED_USER_PICTURE_FORMAT.join(", ")}).`,
        2: `Please use files smaller than ${atoms_1.limits.MAX_USER_PICTURE_SIZE / (1024 * 1024)} MB.`,
        3: "Please add a file with a valid name.",
    },
    description: {
        root: `Descriptions must contain between ${atoms_1.limits.MIN_USER_DESCRIPTION_LENGTH} and ${atoms_1.limits.MAX_USER_DESCRIPTION_LENGTH} characters.`,
        1: `Please use between ${atoms_1.limits.MIN_USER_DESCRIPTION_LENGTH} and ${atoms_1.limits.MAX_USER_DESCRIPTION_LENGTH} characters.`,
    },
    tagline: {
        root: `Taglines must contain between ${atoms_1.limits.MIN_USER_TAGLINE_LENGTH} and ${atoms_1.limits.MAX_USER_TAGLINE_LENGTH} characters.`,
        1: `Please use between ${atoms_1.limits.MIN_USER_TAGLINE_LENGTH} and ${atoms_1.limits.MAX_USER_TAGLINE_LENGTH} characters.`,
    },
    calendly: {
        root: "Calendly URLs must contain http:// or https:// and be valid",
        1: "Please add http:// or https:// before your calendly url.",
        2: "Please add a valid calendly url.",
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
    return value.length >= min && value.length <= max
        ? true
        : withPolicy
            ? exports.policy.name[1]
            : false;
}
function isEmailAcceptable(value, withPolicy = atoms_1.WITH_POLICY) {
    if (lodash_1.default.isNil(value) || lodash_1.default.isEmpty(value) || !lodash_1.default.isString(value))
        return withPolicy ? exports.policy.email[1] : false;
    return validator_1.default.isEmail(value) ? true : withPolicy ? exports.policy.email[1] : false;
}
function isUsernameAcceptable(value, withPolicy = atoms_1.WITH_POLICY) {
    const [min, max] = [atoms_1.limits.MIN_USERNAME_LENGTH, atoms_1.limits.MAX_USERNAME_LENGTH];
    if (lodash_1.default.isNil(value) ||
        lodash_1.default.isEmpty(value) ||
        (!lodash_1.default.isString(value) && !lodash_1.default.isNumber(value)))
        return withPolicy ? exports.policy.username[1] : false;
    if (!(value.length >= min && value.length <= max))
        return withPolicy ? exports.policy.username[1] : false;
    if (!value.match(atoms_1.limits.FORMAT_USERNAME))
        return withPolicy ? exports.policy.username[2] : false;
    if (limits_1.PROTECTED_USERNAMES.includes(value))
        return withPolicy ? exports.policy.username[3] : false;
    return true;
}
function isUserDescriptionAcceptable(value, withPolicy = atoms_1.WITH_POLICY) {
    const [min, max] = [
        atoms_1.limits.MIN_USER_DESCRIPTION_LENGTH,
        atoms_1.limits.MAX_USER_DESCRIPTION_LENGTH,
    ];
    if (lodash_1.default.isNil(value) || lodash_1.default.isEmpty(value) || !lodash_1.default.isString(value))
        return withPolicy ? exports.policy.description.root : false;
    return value.length >= min && value.length <= max
        ? true
        : withPolicy
            ? exports.policy.description[1]
            : false;
}
function isUserTaglineAcceptable(value, withPolicy = atoms_1.WITH_POLICY) {
    const [min, max] = [
        atoms_1.limits.MIN_USER_TAGLINE_LENGTH,
        atoms_1.limits.MAX_USER_TAGLINE_LENGTH,
    ];
    if (lodash_1.default.isNil(value) || lodash_1.default.isEmpty(value) || !lodash_1.default.isString(value))
        return withPolicy ? exports.policy.tagline.root : false;
    return value.length >= min && value.length <= max
        ? true
        : withPolicy
            ? exports.policy.tagline[1]
            : false;
}
function isUserPictureAcceptable(value, withPolicy = atoms_1.WITH_POLICY, options) {
    if (options && options.vendor === "multer") {
        /** Server Side */
        const name = lodash_1.default.get(value, "originalname");
        const type = lodash_1.default.attempt(() => lodash_1.default.toString(value.mimetype).split("/").pop());
        const size = lodash_1.default.toNumber(lodash_1.default.get(value, "size"));
        if (lodash_1.default.isNil(name) || lodash_1.default.isEmpty(name) || !lodash_1.default.isString(name))
            return withPolicy ? exports.policy.picture[3] : false;
        if (lodash_1.default.isError(type) ||
            !atoms_1.limits.ALLOWED_USER_PICTURE_FORMAT.includes(type || ""))
            return withPolicy ? exports.policy.picture[1] : false;
        if (lodash_1.default.isError(size) || size <= 0 || size > atoms_1.limits.MAX_USER_PICTURE_SIZE)
            return withPolicy ? exports.policy.picture[2] : false;
        return true;
    }
    else {
        /** Client Side */
        const name = lodash_1.default.get(value, "name");
        const type = lodash_1.default.attempt(() => lodash_1.default.get(value, "type").split("/").pop());
        const size = lodash_1.default.toNumber(lodash_1.default.get(value, "size"));
        if (lodash_1.default.isNil(name) || lodash_1.default.isEmpty(name) || !lodash_1.default.isString(name))
            return withPolicy ? exports.policy.picture[3] : false;
        if (lodash_1.default.isError(type) ||
            !atoms_1.limits.ALLOWED_USER_PICTURE_FORMAT.includes(type || ""))
            return withPolicy ? exports.policy.picture[1] : false;
        if (lodash_1.default.isError(size) || size <= 0 || size > atoms_1.limits.MAX_USER_PICTURE_SIZE)
            return withPolicy ? exports.policy.picture[2] : false;
        return true;
    }
}
function isUserCalendlyAcceptable(value, withPolicy = atoms_1.WITH_POLICY) {
    if (lodash_1.default.isNil(value) || lodash_1.default.isEmpty(value) || !lodash_1.default.isString(value))
        return withPolicy ? exports.policy.calendly[2] : false;
    if (!(value.startsWith("https://") || value.startsWith("http://")))
        return withPolicy ? exports.policy.calendly[1] : false;
    if (value.toLowerCase().indexOf("calendly") < 0)
        return withPolicy ? exports.policy.calendly[2] : false;
    return validator_1.default.isURL(value, { require_protocol: true })
        ? true
        : withPolicy
            ? exports.policy.calendly[2]
            : false;
}
exports.default = {
    isEmailAcceptable,
    isNameAcceptable,
    isPasswordAcceptable,
    isUsernameAcceptable,
    isUserDescriptionAcceptable,
    isUserPictureAcceptable,
    isUserTaglineAcceptable,
    isUserCalendlyAcceptable,
};
