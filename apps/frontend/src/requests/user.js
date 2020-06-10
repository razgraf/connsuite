import _ from "lodash";
import fetch from "cross-fetch";
import { API, status } from "../constants";
import { buildHeaders } from "../utils/atoms";

/**
 * @param {object} p0
 * @param {object} p0.auth - Authorization (persisted)
 * @param {object} p0.identifier - User identification (id or username)
 * @param {boolean} [handle] - Handle response inside (OK vs Not OK)
 */
async function get({ auth, identifier }, handle = true) {
  const endpoint = new URL(API.userGet(identifier));

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
 * @param {object} p0.user - User identification (id or username)
 * @param {boolean} [handle] - Handle response inside (OK vs Not OK)
 */
async function profile({ auth, identifier }, handle = true) {
  const endpoint = new URL(API.userGet(identifier));

  const params = {
    skills: true,
    categories: true,
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
 * @param {object} [p0.auth] - Authorization (persisted)
 * @param {object} p0.identifier - User identification (id or username)
 * @param {boolean} [handle] - Handle response inside (OK vs Not OK)
 */
async function listSkillsAndCategories({ auth, identifier }, handle = true) {
  const endpoint = new URL(API.userListSkillsAndCategories(identifier));

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
 * @param {string} p0.articleId - Item identification
 * @param {object} p0.article
 * @param {string} p0.article.type
 * @param {string} p0.article.title
 * @param {string} [p0.article.skills] - 🚨 PREPROCESS:: Has to be a stringified JSON
 * @param {string} [p0.article.categories] - 🚨 PREPROCESS:: Has to be a stringified JSON
 * @param {string} [p0.article.content]
 * @param {string} [p0.article.url]
 * @param {File} [p0.article.cover]
 * @param {boolean} [handle] - Handle response inside (OK vs Not OK)
 */
async function edit({ auth, profile }, handle = true) {
  const body = new FormData();
  Object.keys(profile).forEach(key => body.append(key, profile[key]));

  const endpoint = new URL(API.userEdit("bear__"));

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

export default {
  get,
  edit,
  profile,
  listSkillsAndCategories,
};
