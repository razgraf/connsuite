import _ from "lodash";
import validator from "validator";

export const MIN_PASSWORD_LENGTH = 8;
export const MAX_MASSWORD_LENGTH = 50;

export const MIN_NAME_LENGTH = 2;
export const MAX_NAME_LENGTH = 50;

export const MIN_USERNAME_LENGTH = 3;
export const MAX_USERNAME_LENGTH = 50;

export const policy = {
  password: {
    root:
      "Passwords must contain at least 8 charaters of which at least one uppercase letter, one lowercase letter, one digit and one special character (#?!@$%^&*-).",
    1: "Please use At least 8 characters (max 50)",
    2: "Please use 1 uppercase letter & 1 lowercase",
    3: "Please use at least 1 digit & 1 special sign",
  },
  name: {
    root: "Names must contain between 2 and 50 characters.",
    1: "Please use between 2 and 50 characters.",
  },
  username: {
    root: "Usernames must contain between 3 and 50 characters and must be unique.",
    1: "Please use between 3 and 50 characters. Make it unique.",
  },
  email: {
    root: "Emails must have a valid format. You will use it to gain access to your ConnSuite account.",
    1: "Please use a valid email",
  },
};

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

function isNameAcceptable(name, withPolicy = true) {
  if (_.isNil(name) || _.isEmpty(name) || !_.isString(name)) return withPolicy ? policy.name[1] : false;
  return name.length >= MIN_NAME_LENGTH && name.length <= MAX_NAME_LENGTH ? true : withPolicy ? policy.name[1] : false;
}

function isEmailAcceptable(email, withPolicy = true) {
  if (_.isNil(email) || _.isEmpty(email) || !_.isString(email)) return withPolicy ? policy.email[1] : false;
  return validator.isEmail(email) ? true : withPolicy ? policy.email[1] : false;
}

function isUsernameAcceptable(username, withPolicy = true) {
  if (_.isNil(username) || _.isEmpty(username) || !_.isString(username)) return false;
  return username.length >= MIN_USERNAME_LENGTH && username.length <= MAX_USERNAME_LENGTH ? true : withPolicy ? policy.username[1] : false;
}

/**
 * Interpret the policy values for out atomic Inputs
 *
 * @param {(isEmailAcceptable|isNameAcceptable|isPasswordAcceptable|isUsernameAcceptable|function)} gate
 * @param {*} value
 */
function interpret(gate, value) {
  if (_.isNil(value) || _.isEmpty(value)) return null;
  if (!_.isFunction(gate)) throw new Error("Gate Method is not a function");
  const result = gate(value);
  return result === true ? null : result;
}

const gates = {
  interpret,
  isEmailAcceptable,
  isNameAcceptable,
  isPasswordAcceptable,
  isUsernameAcceptable,
};

export default gates;
