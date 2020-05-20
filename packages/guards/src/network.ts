/* eslint-disable @typescript-eslint/camelcase */ /* -- validator {require_protocol} -- */
import _ from "lodash";
import validator from "validator";
import { limits, WITH_POLICY } from "./atoms";

export const policy = {
  root: "Network must be valid",
  title: {
    root: `Titles must contain between ${limits.MIN_NETWORK_TITLE_LENGTH} and ${limits.MAX_NETWORK_TITLE_LENGTH} characters.`,
    1: `Please use between ${limits.MIN_NETWORK_TITLE_LENGTH} and ${limits.MAX_NETWORK_TITLE_LENGTH} characters for the title.`,
  },
  icon: {
    root: `Icons must be images (${limits.ALLOWED_NETWORK_ICON_FORMAT.join(
      ", "
    )}) and must have a maximum size of ${
      limits.MAX_NETWORK_ICON_SIZE / (1024 * 1024)
    } MB.`,
    1: `Please use files that are images: (${limits.ALLOWED_NETWORK_ICON_FORMAT.join(
      ", "
    )}).`,
    2: `Please use files smaller than ${
      limits.MAX_NETWORK_ICON_SIZE / (1024 * 1024)
    } MB.`,
    3: "Please add a file with a valid name.",
  },
  username: {
    root: `Usernames must contain between ${limits.MIN_NETWORK_USERNAME_LENGTH} and ${limits.MAX_NETWORK_USERNAME_LENGTH} characters.`,
    1: `Please use between ${limits.MIN_NETWORK_USERNAME_LENGTH} and ${limits.MAX_NETWORK_USERNAME_LENGTH} characters.`,
  },
  description: {
    root: `Descriptions can be empty or must contain between ${limits.MIN_NETWORK_DESCRIPTION_LENGTH} and ${limits.MAX_NETWORK_DESCRIPTION_LENGTH} characters.`,
    1: `Please use between ${limits.MIN_NETWORK_DESCRIPTION_LENGTH} and ${limits.MAX_NETWORK_DESCRIPTION_LENGTH} characters.`,
  },
  externalId: {
    root:
      "A network must be chosen (or created at step b.) in order to move to the next step.",
    1: "Please choose a valid network in order to proceed.",
    2: "Please choose an external network supported by us. If not, create a custom one.",
  },
  url: {
    root: "Websites and URLs have to contain http:// or https:// and be valid",
    1: "Please add http:// or https:// before your website or url.",
    2: "Please add a valid website or url.",
  },
};

function isNetworkTitleAcceptable(
  value: string,
  withPolicy = WITH_POLICY
): string | boolean {
  const [min, max] = [
    limits.MIN_NETWORK_TITLE_LENGTH,
    limits.MAX_NETWORK_TITLE_LENGTH,
  ];
  if (
    _.isNil(value) ||
    _.isEmpty(value) ||
    (!_.isString(value) && !_.isNumber(value))
  )
    return withPolicy ? policy.title[1] : false;
  return value.length >= min && value.length <= max
    ? true
    : withPolicy
    ? policy.title[1]
    : false;
}

function isNetworkUsernameAcceptable(
  value: string,
  withPolicy = WITH_POLICY
): string | boolean {
  const [min, max] = [
    limits.MIN_NETWORK_USERNAME_LENGTH,
    limits.MAX_NETWORK_USERNAME_LENGTH,
  ];
  if (
    _.isNil(value) ||
    _.isEmpty(value) ||
    (!_.isString(value) && !_.isNumber(value))
  )
    return withPolicy ? policy.username[1] : false;
  return value.length >= min && value.length <= max
    ? true
    : withPolicy
    ? policy.username[1]
    : false;
}

function isNetworkExternalIdAcceptable(
  value: string,
  withPolicy = WITH_POLICY,
  networks: object
): string | boolean {
  if (_.isNil(value) || _.isEmpty(value) || !_.isString(value))
    return withPolicy ? policy.externalId[1] : false;
  if (
    !_.isNil(networks) &&
    Object.keys(networks).length > 0 &&
    !Object.keys(networks).includes(value)
  )
    return withPolicy ? policy.externalId[2] : false;

  return true;
}

function isNetworkIconAcceptable(
  value:
    | {
        name: string;
        type: string;
        size: string | number;
        [key: string]: string | number;
      }
    | Express.Multer.File,
  withPolicy = WITH_POLICY,
  options: { vendor: string; [key: string]: string }
): string | boolean {
  if (options && options.vendor === "multer") {
    /** Server Side */
    const name = _.get(value, "originalname");
    const type = _.attempt(() => _.toString(value.mimetype).split("/").pop());
    const size = _.toNumber(_.get(value, "size"));

    if (_.isNil(name) || _.isEmpty(name) || !_.isString(name))
      return withPolicy ? policy.icon[3] : false;
    if (
      _.isError(type) ||
      !limits.ALLOWED_NETWORK_ICON_FORMAT.includes(type || "")
    )
      return withPolicy ? policy.icon[1] : false;
    if (_.isError(size) || size <= 0 || size > limits.MAX_NETWORK_ICON_SIZE)
      return withPolicy ? policy.icon[2] : false;
    return true;
  } else {
    /** Client Side */
    const name = _.get(value, "name");
    const type = _.attempt(() => _.get(value, "type").split("/").pop());
    const size = _.toNumber(_.get(value, "size"));
    if (_.isNil(name) || _.isEmpty(name) || !_.isString(name))
      return withPolicy ? policy.icon[3] : false;
    if (
      _.isError(type) ||
      !limits.ALLOWED_NETWORK_ICON_FORMAT.includes(type || "")
    )
      return withPolicy ? policy.icon[1] : false;
    if (_.isError(size) || size <= 0 || size > limits.MAX_NETWORK_ICON_SIZE)
      return withPolicy ? policy.icon[2] : false;
    return true;
  }
}

function isNetworkUrlAcceptable(
  value: string,
  withPolicy = WITH_POLICY
): string | boolean {
  if (_.isNil(value) || _.isEmpty(value) || !_.isString(value))
    return withPolicy ? policy.url[2] : false;
  if (!(value.startsWith("https://") || value.startsWith("http://")))
    return withPolicy ? policy.url[1] : false;
  return validator.isURL(value, { require_protocol: true })
    ? true
    : withPolicy
    ? policy.url[2]
    : false;
}

function isNetworkDescriptionsAcceptable(
  value: string,
  withPolicy = WITH_POLICY
): string | boolean {
  const [min, max] = [
    limits.MIN_NETWORK_DESCRIPTION_LENGTH,
    limits.MAX_NETWORK_DESCRIPTION_LENGTH,
  ];
  if (_.isNil(value) || _.isEmpty(value) || !_.isString(value))
    return withPolicy ? policy.description.root : false;
  return value.length >= min && value.length <= max
    ? true
    : withPolicy
    ? policy.description[1]
    : false;
}

export default {
  isNetworkTitleAcceptable,
  isNetworkIconAcceptable,
  isNetworkExternalIdAcceptable,
  isNetworkUsernameAcceptable,
  isNetworkUrlAcceptable,
  isNetworkDescriptionsAcceptable,
};
