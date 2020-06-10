/* eslint-disable @typescript-eslint/camelcase */ /* -- validator {require_protocol} -- */
import _ from "lodash";
import validator from "validator";
import { limits, WITH_POLICY } from "./atoms";

export const policy = {
  password: {
    root: `Passwords must contain at least ${limits.MIN_PASSWORD_LENGTH} charaters of which at least one uppercase letter, one lowercase letter, one digit and one special character (#?!@$%^&*-).`,
    1: `Please use At least ${limits.MIN_PASSWORD_LENGTH} characters (max ${limits.MAX_MASSWORD_LENGTH})`,
    2: "Please use 1 uppercase letter & 1 lowercase",
    3: "Please use at least 1 digit & 1 special sign",
  },
  name: {
    root: `Names must contain between ${limits.MIN_NAME_LENGTH} and ${limits.MAX_MASSWORD_LENGTH} characters.`,
    1: `Please use between ${limits.MIN_NAME_LENGTH} and ${limits.MAX_MASSWORD_LENGTH} characters.`,
  },
  username: {
    root: `Usernames must contain between ${limits.MIN_USERNAME_LENGTH} and ${limits.MAX_USERNAME_LENGTH} characters and must be unique.`,
    1: `Please use between ${limits.MIN_USERNAME_LENGTH} and ${limits.MAX_USERNAME_LENGTH} characters. Make it unique.`,
  },
  email: {
    root:
      "Emails must have a valid format. You will use it to gain access to your ConnSuite account.",
    1: "Please use a valid email",
  },
  picture: {
    root: `The picture must be an image (${limits.ALLOWED_USER_PICTURE_FORMAT.join(
      ", "
    )}) and must have a maximum size of ${
      limits.MAX_USER_PICTURE_SIZE / (1024 * 1024)
    } MB.`,
    1: `Please use files that are images: (${limits.ALLOWED_USER_PICTURE_FORMAT.join(
      ", "
    )}).`,
    2: `Please use files smaller than ${
      limits.MAX_USER_PICTURE_SIZE / (1024 * 1024)
    } MB.`,
    3: "Please add a file with a valid name.",
  },
  description: {
    root: `Descriptions can be empty or must contain between ${limits.MIN_USER_DESCRIPTION_LENGTH} and ${limits.MAX_USER_DESCRIPTION_LENGTH} characters.`,
    1: `Please use between ${limits.MIN_USER_DESCRIPTION_LENGTH} and ${limits.MAX_USER_DESCRIPTION_LENGTH} characters.`,
  },
};

function isPasswordAcceptable(
  value: string,
  withPolicy = WITH_POLICY
): string | boolean {
  const [min, max] = [limits.MIN_PASSWORD_LENGTH, limits.MAX_MASSWORD_LENGTH];
  if (_.isNil(value) || _.isEmpty(value) || !_.isString(value))
    return withPolicy ? policy.password[1] : false;
  if (value.length < min || value.length > max)
    return withPolicy ? policy.password[1] : false;

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

function isNameAcceptable(
  value: string,
  withPolicy = WITH_POLICY
): string | boolean {
  const [min, max] = [limits.MIN_NAME_LENGTH, limits.MAX_NAME_LENGTH];
  if (_.isNil(value) || _.isEmpty(value) || !_.isString(value))
    return withPolicy ? policy.name[1] : false;
  return value.length >= min && value.length <= max
    ? true
    : withPolicy
    ? policy.name[1]
    : false;
}

function isEmailAcceptable(
  value: string,
  withPolicy = WITH_POLICY
): string | boolean {
  if (_.isNil(value) || _.isEmpty(value) || !_.isString(value))
    return withPolicy ? policy.email[1] : false;
  return validator.isEmail(value) ? true : withPolicy ? policy.email[1] : false;
}

function isUsernameAcceptable(
  value: string,
  withPolicy = WITH_POLICY
): string | boolean {
  const [min, max] = [limits.MIN_USERNAME_LENGTH, limits.MAX_USERNAME_LENGTH];
  if (
    _.isNil(value) ||
    _.isEmpty(value) ||
    (!_.isString(value) && !_.isNumber(value))
  )
    return false;
  return value.length >= min && value.length <= max
    ? true
    : withPolicy
    ? policy.username[1]
    : false;
}

function isUserDescriptionAcceptable(
  value: string,
  withPolicy = WITH_POLICY
): string | boolean {
  const [min, max] = [
    limits.MIN_USER_DESCRIPTION_LENGTH,
    limits.MAX_USER_DESCRIPTION_LENGTH,
  ];
  if (_.isNil(value) || _.isEmpty(value) || !_.isString(value))
    return withPolicy ? policy.description.root : false;
  return value.length >= min && value.length <= max
    ? true
    : withPolicy
    ? policy.description[1]
    : false;
}

function isUserPictureAcceptable(
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
      return withPolicy ? policy.picture[3] : false;
    if (
      _.isError(type) ||
      !limits.ALLOWED_USER_PICTURE_FORMAT.includes(type || "")
    )
      return withPolicy ? policy.picture[1] : false;
    if (_.isError(size) || size <= 0 || size > limits.MAX_USER_PICTURE_SIZE)
      return withPolicy ? policy.picture[2] : false;
    return true;
  } else {
    /** Client Side */
    const name = _.get(value, "name");
    const type = _.attempt(() => _.get(value, "type").split("/").pop());
    const size = _.toNumber(_.get(value, "size"));
    if (_.isNil(name) || _.isEmpty(name) || !_.isString(name))
      return withPolicy ? policy.picture[3] : false;
    if (
      _.isError(type) ||
      !limits.ALLOWED_USER_PICTURE_FORMAT.includes(type || "")
    )
      return withPolicy ? policy.picture[1] : false;
    if (_.isError(size) || size <= 0 || size > limits.MAX_USER_PICTURE_SIZE)
      return withPolicy ? policy.picture[2] : false;
    return true;
  }
}

export default {
  isEmailAcceptable,
  isNameAcceptable,
  isPasswordAcceptable,
  isUsernameAcceptable,
  isUserDescriptionAcceptable,
  isUserPictureAcceptable,
};
