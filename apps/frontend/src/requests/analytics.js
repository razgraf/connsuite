import _ from "lodash";
import fetch from "cross-fetch";
import { API, types, status } from "../constants";
import { buildHeaders } from "../utils/atoms";

async function visitCreate({ auth, type, targetId }, handle = true) {
  const endpoint = new URL(API.analyticsVisitCreate());
  const response = await fetch(endpoint, {
    method: "POST",
    headers: buildHeaders({ auth }),
    body: JSON.stringify({
      type,
      targetId,
    }),
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

async function visitList({ auth, type = types.visit.type.network, from = null, to = null }, handle = true) {
  const endpoint = [types.visit.type.profile].includes(type)
    ? new URL(API.analyticsVisitGet(type, "user"))
    : new URL(API.analyticsVisitList(type));
  const params = {
    from,
    to,
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
  visitCreate,
  visitList,
};
