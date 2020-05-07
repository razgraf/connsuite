import _ from "lodash";
import fetch from "isomorphic-unfetch";
import { API, status } from "../constants";

/**
 * Create a new user with the Google System
 * @throws ...
 *
 * @param {object} payload
 */

async function google(payload) {
  console.log(payload);
  const endpoint = new URL(API.authGoogle());
  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  console.log(response.status);

  if (response.status === status.OK) {
    return response.json();
  } else {
    const error = await _.attempt(async () => response.json());
    console.log(error);
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
    headers: {
      "Content-Type": "application/json",
    },
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
async function isAuthorized() {
  const endpoint = new URL(API.authStatus());
  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer INSERT_HERE TODO",
    },
    body: JSON.stringify({ todo: 0 }),
  });

  return response.status === status.OK;
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
    headers: {
      "Content-Type": "application/json",
    },
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
 * Disconnect a user
 */
async function logout() {
  console.error("Not implemented yet");
  return null;
}

const AuthRequest = {
  isAuthorized,

  google,
  login,
  register,
  logout,
};

export default AuthRequest;
