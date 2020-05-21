import _ from "lodash";
import fetch from "cross-fetch";
import { API, status } from "../constants";
import { buildHeaders } from "../utils/atoms";

/**
 * Create a new user with the Google System
 * @throws ...
 *
 * @param {object} payload
 */

async function google(payload) {
  const response = await fetch(API.authGoogle(), {
    method: "POST",
    headers: buildHeaders(),
    credentials: "omit",
    body: JSON.stringify(payload),
  });

  if (response.status === status.OK) {
    return response.json();
  } else {
    const error = await _.attempt(async () => response.json());
    console.error(error);
    if (!_.isError(error) && _.has(error, "message")) throw new Error(error.message);
    throw new Error("Connection error.");
  }
}

/**
 * Create a new user with the Classic System
 * @throws ...
 *
 * @param {object} payload
 * @param {string} payload.firstName
 * @param {string} payload.lastName
 * @param {string} payload.username
 * @param {string} payload.email
 * @param {string} payload.password
 */

async function register(payload) {
  const endpoint = new URL(API.authRegister());
  const response = await fetch(endpoint, {
    method: "POST",
    headers: buildHeaders(),
    credentials: "omit",
    body: JSON.stringify(payload),
  });

  if (response.status === status.OK) {
    return response.json();
  } else {
    const error = await _.attempt(async () => response.json());
    if (!_.isError(error) && _.has(error, "message")) throw new Error(error.message);
    throw new Error("Connection error.");
  }
}

/**
 * Check if the user is authorized based on the Bearer Token
 * @throws ...
 */
async function isAuthorized(auth) {
  if (_.isNil(auth) || !_.get(auth, "token.value")) return false;

  const response = await fetch(API.authStatus(), {
    method: "GET",
    headers: buildHeaders({ auth }),
    credentials: "omit",
  });

  if (response.status === status.OK) {
    return response.json();
  } else {
    return false;
  }
}

async function isShallowAuthorized(auth) {
  try {
    const token = _.get(auth, "token.value");

    return !_.isNil(token) && !_.isEmpty(token);
  } catch (e) {
    console.error(e);
  }

  return false;
}

/**
 * Connect a user with the Classic System (only if already registered with the Classic System)
 * @throws ...
 *
 * @param {object} payload
 * @param {string} payload.email
 * @param {string} payload.password
 */

async function login(payload) {
  const endpoint = new URL(API.authLogin());
  const response = await fetch(endpoint, {
    method: "POST",
    headers: buildHeaders(),
    body: JSON.stringify(payload),
    credentials: "omit",
  });

  if (response.status === status.OK) {
    return response.json();
  } else {
    const error = await _.attempt(async () => response.json());
    if (!_.isError(error) && _.has(error, "message")) throw new Error(error.message);
    throw new Error("Connection error.");
  }
}

/**
 * Disconnect a user
 */
async function logout(auth) {
  const endpoint = new URL(API.authLogout());
  await fetch(endpoint, {
    method: "POST",
    headers: buildHeaders({ auth }),
    credentials: "omit",
  });
}

export default {
  isAuthorized,
  isShallowAuthorized,

  google,
  login,
  register,
  logout,
};
