import _ from "lodash";
import fetch, { Headers } from "node-fetch";
import { atoms, HTTP_CODE } from "../constants";
import { AuthError } from "../errors";
import { Request } from "../models";

/**
 * @param authHeader Authorization header from req:Request
 */
async function getAuthorizedIdentity(authHeader: string): Promise<Request.Response> {
  try {
    const response = await fetch(atoms.dependency.backend.status, {
      method: "GET",
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: authHeader,
      }),
    });

    if (response.status !== HTTP_CODE.OK) return null;
    const identity = await response.json();
    return identity;
  } catch (e) {
    return null;
  }
}

export default {
  getAuthorizedIdentity,
};
