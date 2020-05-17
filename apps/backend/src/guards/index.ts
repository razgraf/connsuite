/* eslint-disable @typescript-eslint/camelcase */ /* -- validator {require_protocol} -- */
import _ from "lodash";
import validator from "validator";
import networks from "../constants/networks";

const WITH_POLICY = false;

export const MIN_PASSWORD_LENGTH = 8;
export const MAX_MASSWORD_LENGTH = 50;

export const MIN_NAME_LENGTH = 2;
export const MAX_NAME_LENGTH = 50;

export const MIN_USERNAME_LENGTH = 3;
export const MAX_USERNAME_LENGTH = 50;

export const MIN_NETWORK_TITLE_LENGTH = 1;
export const MAX_NETWORK_TITLE_LENGTH = 100;

export const MIN_NETWORK_USERNAME_LENGTH = 2;
export const MAX_NETWORK_USERNAME_LENGTH = 50;

export const MIN_NETWORK_DESCRIPTION_LENGTH = 2;
export const MAX_NETWORK_DESCRIPTION_LENGTH = 500;

export const MAX_NETWORK_ICON_SIZE = 5 * 1024 * 1024;
export const ALLOWED_NETWORK_ICON_FORMAT = ["jpg", "jpeg", "gif", "png"];

export const MAX_FILE_SIZE = Math.max(MAX_NETWORK_ICON_SIZE, 0);

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
    root: `Usernames must contain between ${MIN_USERNAME_LENGTH} and ${MAX_USERNAME_LENGTH} characters and must be unique.`,
    1: `Please use between ${MIN_USERNAME_LENGTH} and ${MAX_USERNAME_LENGTH} characters. Make it unique.`,
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
      root: `Usernames must contain between ${MIN_NETWORK_USERNAME_LENGTH} and ${MAX_NETWORK_USERNAME_LENGTH} characters.`,
      1: `Please use between ${MIN_NETWORK_USERNAME_LENGTH} and ${MAX_NETWORK_USERNAME_LENGTH} characters.`,
    },
    description: {
      root: `Descriptions can be empty or must contain between ${MIN_NETWORK_DESCRIPTION_LENGTH} and ${MAX_NETWORK_DESCRIPTION_LENGTH} characters.`,
      1: `Please use between ${MIN_NETWORK_DESCRIPTION_LENGTH} and ${MAX_NETWORK_DESCRIPTION_LENGTH} characters.`,
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
  },
};

/**
 * Auth Guards
 */

function isPasswordAcceptable(value: string, withPolicy = WITH_POLICY): string | boolean {
  const [min, max] = [MIN_PASSWORD_LENGTH, MAX_MASSWORD_LENGTH];
  if (_.isNil(value) || _.isEmpty(value) || !_.isString(value)) return withPolicy ? policy.password[1] : false;
  if (value.length < min || value.length > max) return withPolicy ? policy.password[1] : false;

  const uppercase = new RegExp("^(?=.*?[A-Z]).{1,}$");
  const lowercase = new RegExp("(?=.*?[a-z]).{1,}$");
  const digit = new RegExp("^(?=.*?[0-9]).{1,}$");
  const special = new RegExp("(?=.*?[#?!@$%^&*-])");

  if (!uppercase.test(value)) return withPolicy ? policy.password[2] : false;
  if (!lowercase.test(value)) return withPolicy ? policy.password[2] : false;
  if (!digit.test(value)) return withPolicy ? policy.password[3] : false;
  if (!special.test(value)) return withPolicy ? policy.password[3] : false;

  return true;
}

function isNameAcceptable(value: string, withPolicy = WITH_POLICY): string | boolean {
  const [min, max] = [MIN_NAME_LENGTH, MAX_NAME_LENGTH];
  if (_.isNil(value) || _.isEmpty(value) || !_.isString(value)) return withPolicy ? policy.name[1] : false;
  return value.length >= min && value.length <= max ? true : withPolicy ? policy.name[1] : false;
}

function isEmailAcceptable(value: string, withPolicy = WITH_POLICY): string | boolean {
  if (_.isNil(value) || _.isEmpty(value) || !_.isString(value)) return withPolicy ? policy.email[1] : false;
  return validator.isEmail(value) ? true : withPolicy ? policy.email[1] : false;
}

function isUsernameAcceptable(value: string, withPolicy = WITH_POLICY): string | boolean {
  const [min, max] = [MIN_USERNAME_LENGTH, MAX_USERNAME_LENGTH];
  if (_.isNil(value) || _.isEmpty(value) || (!_.isString(value) && !_.isNumber(value))) return false;
  return value.length >= min && value.length <= max ? true : withPolicy ? policy.username[1] : false;
}

/**
 * Network Guards
 */

function isNetworkTitleAcceptable(value: string, withPolicy = WITH_POLICY): string | boolean {
  const [min, max] = [MIN_NETWORK_TITLE_LENGTH, MAX_NETWORK_TITLE_LENGTH];
  if (_.isNil(value) || _.isEmpty(value) || (!_.isString(value) && !_.isNumber(value)))
    return withPolicy ? policy.network.title[1] : false;
  return value.length >= min && value.length <= max ? true : withPolicy ? policy.network.title[1] : false;
}

function isNetworkUsernameAcceptable(value: string, withPolicy = WITH_POLICY): string | boolean {
  const [min, max] = [MIN_NETWORK_USERNAME_LENGTH, MAX_NETWORK_USERNAME_LENGTH];
  if (_.isNil(value) || _.isEmpty(value) || (!_.isString(value) && !_.isNumber(value)))
    return withPolicy ? policy.network.username[1] : false;
  return value.length >= min && value.length <= max ? true : withPolicy ? policy.network.username[1] : false;
}

function isNetworkExternalIdAcceptable(value: string, withPolicy = WITH_POLICY): string | boolean {
  if (_.isNil(value) || _.isEmpty(value) || !_.isString(value))
    return withPolicy ? policy.network.externalId[1] : false;
  if (!Object.keys(networks).includes(value)) return withPolicy ? policy.network.externalId[2] : false;

  return true;
}

function isNetworkIconAcceptable(
  value: { name: string; type: string; size: string | number; [key: string]: string | number } | Express.Multer.File,
  withPolicy = WITH_POLICY,
  options: { vendor: string; [key: string]: string },
): string | boolean {
  if (options && options.vendor === "multer") {
    /** Server Side */
    const name = _.get(value, "originalname");
    const type = _.attempt(() => _.toString(value.mimetype).split("/").pop());
    const size = _.toNumber(_.get(value, "size"));

    if (_.isNil(name) || _.isEmpty(name) || !_.isString(name)) return withPolicy ? policy.network.icon[3] : false;
    if (_.isError(type) || !ALLOWED_NETWORK_ICON_FORMAT.includes(type || ""))
      return withPolicy ? policy.network.icon[1] : false;
    if (_.isError(size) || size <= 0 || size > MAX_NETWORK_ICON_SIZE)
      return withPolicy ? policy.network.icon[2] : false;
    return true;
  } else {
    /** Client Side */
    const name = _.get(value, "name");
    const type = _.attempt(() => _.get(value, "type").split("/").pop());
    const size = _.toNumber(_.get(value, "size"));
    if (_.isNil(name) || _.isEmpty(name) || !_.isString(name)) return withPolicy ? policy.network.icon[3] : false;
    if (_.isError(type) || !ALLOWED_NETWORK_ICON_FORMAT.includes(type || ""))
      return withPolicy ? policy.network.icon[1] : false;
    if (_.isError(size) || size <= 0 || size > MAX_NETWORK_ICON_SIZE)
      return withPolicy ? policy.network.icon[2] : false;
    return true;
  }
}

function isNetworkUrlAcceptable(value: string, withPolicy = WITH_POLICY): string | boolean {
  if (_.isNil(value) || _.isEmpty(value) || !_.isString(value)) return withPolicy ? policy.network.url[2] : false;
  if (!(value.startsWith("https://") || value.startsWith("http://"))) return withPolicy ? policy.network.url[1] : false;
  return validator.isURL(value, { require_protocol: true }) ? true : withPolicy ? policy.network.url[2] : false;
}

function isNetworkDescriptionsAcceptable(value: string, withPolicy = WITH_POLICY): string | boolean {
  const [min, max] = [MIN_NETWORK_DESCRIPTION_LENGTH, MAX_NETWORK_DESCRIPTION_LENGTH];
  if (_.isNil(value) || _.isEmpty(value) || !_.isString(value))
    return withPolicy ? policy.network.description.root : false;
  return value.length >= min && value.length <= max ? true : withPolicy ? policy.network.description[1] : false;
}

/**
 * Interpret the policy values for out atomic Inputs
 *
 * @param {function} gate
 * @param {*} value
 */
function interpret(gate: Function, value: any): any {
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
  isNetworkUrlAcceptable,
  isNetworkDescriptionsAcceptable,
};

export default guards;
