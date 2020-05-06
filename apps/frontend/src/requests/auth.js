import fetch from "isomorphic-unfetch";
import { API, status } from "../constants";

/**
 * Create a new user with the Google System
 *
 * @param {object} payload
 */

async function google(payload) {
  try {
    const endpoint = new URL(API.authGoogle());
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (response.status === status.OK) {
      const body = await response.json();
      console.log("User", body);

      // TODO Manage User Storage
    } else {
      throw new Error("Nah");
    }
  } catch (e) {
    console.error(e);
  }

  return null;
}

/**
 * Create a new user with the Classic System
 *
 * @param {object} payload
 * @param {string} payload.firstName
 * @param {string} payload.lastName
 * @param {string} payload.username
 * @param {string} payload.email
 * @param {string} payload.password
 */

async function register(payload) {
  try {
    const endpoint = new URL(API.authRegister());
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (response.status === status.OK) {
      const body = await response.json();
      console.log("User", body);

      // TODO Manage User Storage
    } else {
      throw new Error("Nah");
    }
  } catch (e) {
    console.error(e);
  }

  return null;
}

/**
 * Check if the user is authorized based on the Bearer Token
 */
async function isAuthorized() {
  try {
    // TODO Manage User Storage - store headers and access them. Redux Persist with next vs simple cookie

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
  } catch (err) {
    console.error(err);
  }
  return false;
}

/**
 * Connect a user with the Classic System (only if already registered with the Classic System)
 *
 * @param {object} payload
 * @param {string} payload.email
 * @param {string} payload.password
 */

async function login(payload) {
  console.error("Not implemented yet");
  return null;
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
