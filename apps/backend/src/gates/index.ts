import _ from "lodash";
import validator from "validator";

export const MIN_PASSWORD_LENGTH = 8;
export const MAX_MASSWORD_LENGTH = 50;

export const MIN_NAME_LENGTH = 2;
export const MAX_NAME_LENGTH = 50;

export const MIN_USERNAME_LENGTH = 3;
export const MAX_USERNAME_LENGTH = 50;

export const policy = {
  password:
    "Passwords must contain at least 8 charaters of which at least one uppercase letter, one lowercase letter, one digit and one special character (?=.*?[#?!@$%^&*-]).",
  name: "Names must contain between 2 and 50 characters.",
  username: "Usernames must contain between 3 and 50 characters and must be unique.",
  email: "Emails must have a valid format",
};

function isPasswordAcceptable(password: string): boolean {
  if (_.isNil(password) || _.isEmpty(password) || !_.isString(password)) return false;
  if (password.length < MIN_PASSWORD_LENGTH || password.length > MAX_MASSWORD_LENGTH) return false;

  const uppercase = new RegExp("^(?=.*?[A-Z]).{1,}$");
  const lowercase = new RegExp("(?=.*?[a-z]).{1,}$");
  const digit = new RegExp("^(?=.*?[0-9]).{1,}$");
  const special = new RegExp("(?=.*?[#?!@$%^&*-])");

  if (!uppercase.test(password)) return false;
  if (!lowercase.test(password)) return false;
  if (!digit.test(password)) return false;
  if (!special.test(password)) return false;

  return true;
}

function isNameAcceptable(name: string): boolean {
  if (_.isNil(name) || _.isEmpty(name) || !_.isString(name)) return false;
  return name.length >= MIN_NAME_LENGTH && name.length <= MAX_NAME_LENGTH;
}

function isEmailAcceptable(email: string): boolean {
  if (_.isNil(email) || _.isEmpty(email) || !_.isString(email)) return false;
  return validator.isEmail(email);
}

function isUsernameAcceptable(username: string): boolean {
  if (_.isNil(username) || _.isEmpty(username) || !_.isString(username)) return false;
  return username.length >= MIN_USERNAME_LENGTH && username.length <= MAX_USERNAME_LENGTH;
}

const gates = {
  isEmailAcceptable,
  isNameAcceptable,
  isPasswordAcceptable,
  isUsernameAcceptable,
};

export default gates;
