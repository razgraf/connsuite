import _ from "lodash";
import fetch from "cross-fetch";
import { API, status } from "../constants";
import { buildHeaders } from "../utils/atoms";

/**
 * @param {object} p0
 * @param {object} p0.auth - Authorization (persisted)
 * @param {object} p0.network
 * @param {string} p0.network.type
 * @param {string} [p0.network.title]
 * @param {string} [p0.network.username]
 * @param {string} [p0.network.description]
 * @param {File} [p0.network.icon]
 * @param {string} [p0.network.url]
 * @param {object} [p0.network.externalId]
 * @param {boolean} [handle] - Handle response inside (OK vs Not OK)
 */
async function create({ auth, network }, handle = true) {
  const body = new FormData();
  Object.keys(network).forEach(key => body.append(key, network[key]));

  const endpoint = new URL(API.networkCreate());
  const response = await fetch(endpoint, {
    method: "POST",
    headers: buildHeaders({ auth, encoding: "auto" }),
    body,
    credentials: "omit",
  });

  if (handle) {
    if (response.status === status.OK) {
      return response.json();
    } else {
      const error = await _.attempt(async () => response.json());
      if (!_.isError(error) && _.has(error, "message")) throw new Error(error.message);
      throw new Error("Connection error.");
    }
  } else return response;
}

/**
 * @param {object} p0
 * @param {object} p0.auth - Authorization (persisted)
 * @param {object} p0.networkId - Item identification
 * @param {string} p0.network
 * @param {string} p0.network.type
 * @param {string} [p0.network.title]
 * @param {string} [p0.network.username]
 * @param {string} [p0.network.description]
 * @param {File} [p0.network.icon]
 * @param {string} [p0.network.url]
 * @param {object} [p0.network.externalId]
 * @param {boolean} [handle] - Handle response inside (OK vs Not OK)
 */
async function edit({ auth, network, networkId }, handle = true) {
  const body = new FormData();
  Object.keys(network).forEach(key => body.append(key, network[key]));

  const endpoint = new URL(API.networkEdit(networkId));
  const response = await fetch(endpoint, {
    method: "PATCH",
    headers: buildHeaders({ auth, encoding: "auto" }),
    body,
    credentials: "omit",
  });

  if (handle) {
    if (response.status === status.OK) {
      return response.json();
    } else {
      const error = await _.attempt(async () => response.json());
      if (!_.isError(error) && _.has(error, "message")) throw new Error(error.message);
      throw new Error("Connection error.");
    }
  } else return response;
}

/**
 * @param {object} p0
 * @param {object} p0.auth - Authorization (persisted)
 * @param {object} p0.networkId - Item identification
 * @param {boolean} [handle] - Handle response inside (OK vs Not OK)
 */
async function remove({ auth, networkId }, handle = true) {
  const endpoint = new URL(API.networkRemove(networkId));
  const response = await fetch(endpoint, {
    method: "DELETE",
    headers: buildHeaders({ auth }),
    credentials: "omit",
  });

  if (handle) {
    if (response.status === status.OK) {
      return response.json();
    } else {
      const error = await _.attempt(async () => response.json());
      if (!_.isError(error) && _.has(error, "message")) throw new Error(error.message);
      throw new Error("Connection error.");
    }
  } else return response;
}

/**
 * @param {object} p0
 * @param {object} p0.auth - Authorization (persisted)
 * @param {object} p0.networkId - Item identification
 * @param {boolean} [handle] - Handle response inside (OK vs Not OK)
 */
async function get({ auth, networkId }, handle = true) {
  const endpoint = new URL(API.networkGet(networkId));
  const response = await fetch(endpoint, {
    method: "GET",
    headers: buildHeaders({ auth }),
    credentials: "omit",
  });

  if (handle) {
    if (response.status === status.OK) {
      return response.json();
    } else {
      const error = await _.attempt(async () => response.json());
      if (!_.isError(error) && _.has(error, "message")) throw new Error(error.message);
      throw new Error("Connection error.");
    }
  } else return response;
}

/**
 * @param {object} p0
 * @param {object} p0.auth - Authorization (persisted)
 * @param {object} p0.user
 * @param {string} p0.user._id - Unique identifier of the user
 * @param {string} p0.user.username - Current username of the user (easy for /profile requests)
 * @param {object} p0.filters
 * @param {number} p0.filters.limit
 * @param {number} p0.filters.offset
 * @param {boolean} [handle] - Handle response inside (OK vs Not OK)
 */
async function list({ auth, user = { _id: null, username: null }, filters = { limit: null, offset: null } }, handle = true) {
  const endpoint = new URL(API.networkList());
  const params = {
    ...user,
    ...filters,
  };
  Object.keys(params).forEach(key => (!_.isNil(params[key]) ? endpoint.searchParams.append(key, params[key]) : null));

  const response = await fetch(endpoint, {
    method: "GET",
    headers: buildHeaders({ auth }),
    credentials: "omit",
  });

  if (handle) {
    if (response.status === status.OK) {
      return response.json();
    } else {
      const error = await _.attempt(async () => response.json());
      if (!_.isError(error) && _.has(error, "message")) throw new Error(error.message);
      throw new Error("Connection error.");
    }
  } else return response;
}

/**
 * @param {object} p0
 * @param {boolean} [handle] - Handle response inside (OK vs Not OK)
 */
async function listExternal(handle = true) {
  const endpoint = new URL(API.networkListExternal());
  const response = await fetch(endpoint, {
    method: "GET",
    headers: buildHeaders(),
    credentials: "omit",
  });
  if (handle) {
    if (response.status === status.OK) {
      return response.json();
    } else {
      const error = await _.attempt(async () => response.json());
      if (!_.isError(error) && _.has(error, "message")) throw new Error(error.message);
      throw new Error("Connection error.");
    }
  } else return response;
}

export default {
  create,
  edit,
  remove,
  get,
  list,
  listExternal,
};
