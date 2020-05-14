import _ from "lodash";
import validator from "validator";

export const MIN_PASSWORD_LENGTH = 8;
export const MAX_MASSWORD_LENGTH = 50;

export const MIN_NAME_LENGTH = 2;
export const MAX_NAME_LENGTH = 50;

export const MIN_USERNAME_LENGTH = 3;
export const MAX_USERNAME_LENGTH = 50;

export const MIN_NETWORK_TITLE_LENGTH = 1;
export const MAX_NETWORK_TITLE_LENGTH = 100;

export const MIN_NETWORK_USERNAME_LENGTH = 1;
export const MAX_NETWORK_USERNAME_LENGTH = 50;

export const MAX_NETWORK_ICON_SIZE = 5 * 1024 * 1024;
export const ALLOWED_NETWORK_ICON_FORMAT = ["jpg", "jpeg", "gif", "png"];

export const policy = {
  password: {
    root: `Passwords must contain at least ${MIN_PASSWORD_LENGTH} charaters of which at least one uppercase letter, one lowercase letter, one digit and one special character (#?!@$%^&*-).`,
    1: `Please use At least ${MIN_PASSWORD_LENGTH} characters (max ${MAX_MASSWORD_LENGTH})`,
    2: "Please use 1 uppercase letter & 1 lowercase",
    3: "Please use at least 1 digit & 1 special sign",
  },
  name: {
    root: `Names must contain between ${MIN_NAME_LENGTH} and ${MAX_MASSWORD_LENGTH} characters.`,
    1: `Please use between ${MIN_NAME_LENGTH} and ${MAX_MASSWORD_LENGTH} characters.`,
  },
  username: {
    root: `Usernames must contain between ${MAX_USERNAME_LENGTH} and ${MAX_USERNAME_LENGTH} characters and must be unique.`,
    1: `Please use between ${MAX_USERNAME_LENGTH} and ${MAX_USERNAME_LENGTH} characters. Make it unique.`,
  },
  email: {
    root: "Emails must have a valid format. You will use it to gain access to your ConnSuite account.",
    1: "Please use a valid email",
  },
  network: {
    root: "Network must be valid",
    title: {
      root: `Titles must contain between ${MIN_NETWORK_TITLE_LENGTH} and ${MAX_NETWORK_TITLE_LENGTH} characters.`,
      1: `Please use between ${MIN_NETWORK_TITLE_LENGTH} and ${MAX_NETWORK_TITLE_LENGTH} characters.`,
    },
    icon: {
      root: `Icons must be images (${ALLOWED_NETWORK_ICON_FORMAT.join(", ")}) and must have a maximum size of ${
        MAX_NETWORK_ICON_SIZE / (1024 * 1024)
      } MB.`,
      1: `Please use files that are images (${ALLOWED_NETWORK_ICON_FORMAT.join(", ")}).`,
      2: `Please use files smaller than ${MAX_NETWORK_ICON_SIZE / (1024 * 1024)} MB.`,
      3: "Please add a file with a valid name.",
    },
    username: {
      root: `Names must contain between ${MIN_NETWORK_USERNAME_LENGTH} and ${MAX_NETWORK_USERNAME_LENGTH} characters.`,
      1: `Please use between ${MIN_NETWORK_USERNAME_LENGTH} and ${MAX_NETWORK_USERNAME_LENGTH} characters.`,
    },
    externalId: {
      root: "A network must be chosen (or created at step b.) in order to move to the next step.",
      1: "Please choose a valid network in order to proceed.",
    },
  },
};

/**
 * Auth Guards
 */

function isPasswordAcceptable(password, withPolicy = true) {
  if (_.isNil(password) || _.isEmpty(password) || !_.isString(password)) return withPolicy ? policy.password[1] : false;
  if (password.length < MIN_PASSWORD_LENGTH || password.length > MAX_MASSWORD_LENGTH) return withPolicy ? policy.password[1] : false;

  const uppercase = new RegExp("^(?=.*?[A-Z]).{1,}$");
  const lowercase = new RegExp("(?=.*?[a-z]).{1,}$");
  const digit = new RegExp("^(?=.*?[0-9]).{1,}$");
  const special = new RegExp("(?=.*?[#?!@$%^&*-])");

  if (!uppercase.test(password)) return withPolicy ? policy.password[2] : false;
  if (!lowercase.test(password)) return withPolicy ? policy.password[2] : false;
  if (!digit.test(password)) return withPolicy ? policy.password[3] : false;
  if (!special.test(password)) return withPolicy ? policy.password[3] : false;

  return true;
}

function isNameAcceptable(value, withPolicy = true) {
  const [min, max] = [MIN_NAME_LENGTH, MAX_NAME_LENGTH];
  if (_.isNil(value) || _.isEmpty(value) || !_.isString(value)) return withPolicy ? policy.name[1] : false;
  return value.length >= min && value.length <= max ? true : withPolicy ? policy.name[1] : false;
}

function isEmailAcceptable(email, withPolicy = true) {
  if (_.isNil(email) || _.isEmpty(email) || !_.isString(email)) return withPolicy ? policy.email[1] : false;
  return validator.isEmail(email) ? true : withPolicy ? policy.email[1] : false;
}

function isUsernameAcceptable(value, withPolicy = true) {
  const [min, max] = [MIN_USERNAME_LENGTH, MAX_USERNAME_LENGTH];
  if (_.isNil(value) || _.isEmpty(value) || (!_.isString(value) && !_.isNumber(value))) return false;
  return value.length >= min && value.length <= max ? true : withPolicy ? policy.username[1] : false;
}

/**
 * Network Guards
 */

function isNetworkTitleAcceptable(value, withPolicy = true) {
  const [min, max] = [MIN_NETWORK_TITLE_LENGTH, MAX_NETWORK_TITLE_LENGTH];
  if (_.isNil(value) || _.isEmpty(value) || (!_.isString(value) && !_.isNumber(value))) return withPolicy ? policy.network.title[1] : false;
  return value.length >= min && value.length <= max ? true : withPolicy ? policy.network.title[1] : false;
}

function isNetworkUsernameAcceptable(value, withPolicy = true) {
  const [min, max] = [MIN_NETWORK_USERNAME_LENGTH, MAX_NETWORK_USERNAME_LENGTH];
  if (_.isNil(value) || _.isEmpty(value) || (!_.isString(value) && !_.isNumber(value)))
    return withPolicy ? policy.network.username[1] : false;
  return value.length >= min && value.length <= max ? true : withPolicy ? policy.network.username[1] : false;
}

function isNetworkExternalIdAcceptable(value, withPolicy = true) {
  if (_.isNil(value) || _.isEmpty(value) || (!_.isString(value) && !_.isNumber(value)))
    return withPolicy ? policy.network.externalId[1] : false;
  return true;
}

function isNetworkIconAcceptable(value = {}, withPolicy = true) {
  const name = _.get(value, "name");
  const type = _.attempt(() => value.type.split("/").pop());
  if (_.isNil(name) || _.isEmpty(name) || (!_.isString(name) && !_.isNumber(name))) return withPolicy ? policy.network.icon[3] : false;
  if (_.isError(type) || !ALLOWED_NETWORK_ICON_FORMAT.includes(type)) return withPolicy ? policy.network.icon[1] : false;
  return true;
}

/**
 * Interpret the policy values for out atomic Inputs
 *
 * @param {function} gate
 * @param {*} value
 */
function interpret(gate, value) {
  if (_.isNil(value) || _.isEmpty(value)) return null;
  if (!_.isFunction(gate)) throw new Error("Gate Method is not a function");
  const result = gate(value);
  return result === true ? null : result;
}

const guards = {
  interpret,
  /** Auth */
  isEmailAcceptable,
  isNameAcceptable,
  isPasswordAcceptable,
  isUsernameAcceptable,
  /** Network */
  isNetworkTitleAcceptable,
  isNetworkIconAcceptable,
  isNetworkExternalIdAcceptable,
  isNetworkUsernameAcceptable,
};

export default guards;
