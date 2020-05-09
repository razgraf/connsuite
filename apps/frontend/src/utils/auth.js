import _ from "lodash";
import { PURGE } from "redux-persist";
import { pages } from "../constants";
import { AuthRequest } from "../requests";
import { redirectTo } from "./atoms";

/**
 *
 *
 * EMERGENCY & DISCONNECT UTILITIES
 *
 */

export async function logout({ store, res = null, local = false } = {}) {
  if (store) {
    try {
      if (local) AuthRequest.logout(store);
    } catch (e) {
      console.error(e);
    }
    store.dispatch({ type: PURGE, result: () => null });
  }

  redirectTo(pages.landing.root, { res });
}

/**
 *
 *
 * VALIDATOR UTILITY
 *
 */

async function validatePublicOnly({ store, res = null, shallow = true }) {
  try {
    const stored = await AuthRequest.isShallowAuthorized(store);
    if (shallow && stored) return redirectTo(pages.dashboard.root, { res });

    const payload = await AuthRequest.isAuthorized(store);
    if (!payload) return false;

    const user = payload && _.has(payload, "user") ? payload.user : null;
    if (!user) return false;

    /** User found and authorized, go to your private content */
    return redirectTo(pages.dashboard.root, { res });
  } catch (e) {
    return false;
  }
}

async function validatePrivateOnly({ store, res = null, shallow = true }) {
  try {
    const stored = await AuthRequest.isShallowAuthorized(store);
    if (shallow && !stored) return logout({ store, local: true, res });

    const payload = await AuthRequest.isAuthorized(store);
    if (!payload) throw new Error("Forbidden");

    const user = payload && _.has(payload, "user") ? payload.user : null;
    if (!user) throw new Error("Forbidden");

    return user;
  } catch (e) {
    return logout({ store, res });
  }
}

async function validateShared({ store, res = null, shallow = true }) {
  try {
    const stored = await AuthRequest.isShallowAuthorized(store);
    if (shallow && stored) return null;

    const payload = await AuthRequest.isAuthorized(store);
    if (!payload) throw new Error("User not available or authorized");

    const user = payload && _.has(payload, "user") ? payload.user : null;
    if (!user) throw new Error("User not available or authorized");

    return user;
  } catch (e) {
    return null;
  }
}

export async function validateAuth({ store, res = null } = {}, visibility = "private", shallow = true) {
  switch (visibility) {
    case "private":
      return validatePrivateOnly({ store, res, shallow });
    case "public":
      return validatePublicOnly({ store, res, shallow });
    case "shared":
    default:
      return validateShared({ store, res, shallow });
  }
}
