import fetch, { Headers } from "node-fetch";
import { atoms, HTTP_CODE, defaults } from "../constants";
import { Request } from "../models";

/**
 * @param authHeader Authorization header from req:Request
 */
async function getAuthorizedIdentity(authHeader: string, tierCheck = false): Promise<Request.Response> {
  const endpoint = `${atoms.dependency.backend.status}?${tierCheck ? `tier=${defaults.tier.analytics}` : ""}`;

  try {
    const response = await fetch(endpoint, {
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
