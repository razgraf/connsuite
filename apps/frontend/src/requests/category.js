import _ from "lodash";
import fetch from "cross-fetch";
import { API, status } from "../constants";
import { buildHeaders } from "../utils/atoms";

/*
 * @param {object} p0
 * @param {boolean} [handle] - Handle response inside (OK vs Not OK)
 */
async function listDefault(handle = true) {
  const endpoint = new URL(API.categoryListDefault());
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
  listDefault,
};
