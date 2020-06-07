import _ from "lodash";
import fetch from "cross-fetch";
import { API, status } from "../constants";
import { buildHeaders } from "../utils/atoms";

/**
 * @param {object} p0
 * @param {object} p0.auth - Authorization (persisted)
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
async function create({ auth, article }, handle = true) {
  const body = new FormData();
  Object.keys(article).forEach(key => body.append(key, article[key]));

  const endpoint = new URL(API.articleCreate());
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
async function edit({ auth, article, articleId }, handle = true) {
  const body = new FormData();
  Object.keys(article).forEach(key => body.append(key, article[key]));

  const endpoint = new URL(API.articleEdit(articleId));
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
 * @param {object} p0.articleId - Item identification
 * @param {boolean} [handle] - Handle response inside (OK vs Not OK)
 */
async function remove({ auth, articleId }, handle = true) {
  const endpoint = new URL(API.articleRemove(articleId));
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
 * @param {object} p0.articleId - Item identification
 * @param {boolean} [handle] - Handle response inside (OK vs Not OK)
 */
async function get({ auth, articleId, query = null }, handle = true) {
  const endpoint = new URL(API.articleGet(articleId));

  if (!_.isNil(query) && _.isObject(query)) {
    Object.keys(query).forEach(key => (!_.isNil(query[key]) ? endpoint.searchParams.append(key, query[key]) : null));
  }

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
  const endpoint = new URL(API.articleList());
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

export default {
  create,
  edit,
  remove,
  get,
  list,
};
