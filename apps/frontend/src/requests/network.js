import _ from "lodash";
import fetch from "cross-fetch";
import { API, status } from "../constants";
import { buildHeaders } from "../utils";

async function create(payload) {
  const endpoint = new URL(API.networkCreate());
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

async function edit(payload, id) {
  const endpoint = new URL(API.networkCreate(id));
  const response = await fetch(endpoint, {
    method: "PATCH",
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

async function remove(payload, id) {
  console.log(payload, id);
}

async function get(id) {
  console.log(id);
}

async function list(filters = {}) {
  console.log(filters);
}

const NetworkRequest = {
  create,
  edit,
  remove,
  get,
  list,
};

export default NetworkRequest;
