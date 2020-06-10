import _ from "lodash";
import { PURGE } from "redux-persist";
import AuthRequest from "../requests/auth";
import { pages, types } from "../constants";
import { redirectTo } from "./atoms";

/**
 *
 *
 * EMERGENCY & DISCONNECT UTILITIES
 *
 */

export async function logout({ auth, dispatch, res = null, local = false } = {}) {
  if (auth) {
    try {
      if (local) AuthRequest.logout(auth);
    } catch (e) {
      console.error(e);
    }
    if (dispatch) dispatch({ type: PURGE, result: () => null });
  }

  redirectTo(pages.landing.root, { res });
}

/**
 *
 *
 * VALIDATOR UTILITY
 *
 */

async function validatePublicOnly({ auth, res = null, shallow = true }) {
  try {
    const stored = AuthRequest.isShallowAuthorized(auth);
    if (shallow && stored) return redirectTo(pages.dashboard.root, { res });

    const payload = await AuthRequest.isAuthorized(auth);
    if (!payload) return false;

    const user = payload && _.has(payload, "user") ? payload.user : null;
    if (!user) return false;

    /** User found and authorized, go to your private content */
    return redirectTo(pages.dashboard.root, { res });
  } catch (e) {
    return false;
  }
}

async function validatePrivateOnly({ auth, dispatch, res = null, shallow = true }) {
  try {
    const stored = AuthRequest.isShallowAuthorized(auth);
    if (shallow && !stored) return logout({ auth, dispatch, local: true, res });

    const payload = await AuthRequest.isAuthorized(auth);
    if (!payload) throw new Error("Forbidden");

    const user = payload && _.has(payload, "user") ? payload.user : null;
    if (!user) throw new Error("Forbidden");

    return user;
  } catch (e) {
    return logout({ auth, dispatch, res });
  }
}

async function validateEliteOnly({ auth, dispatch, res = null, tier = types.tier.access.analytics }) {
  try {
    const stored = AuthRequest.isShallowAuthorized(auth);
    if (!stored) return logout({ auth, dispatch, local: true, res });

    const payload = await AuthRequest.isAuthorized(auth, tier);
    if (!payload) throw new Error("Forbidden");

    const user = payload && _.has(payload, "user") ? payload.user : null;
    if (!user) throw new Error("Forbidden");

    const elite = _.get(payload, "elite");

    return { user, elite };
  } catch (e) {
    return logout({ auth, dispatch, res });
  }
}

async function validateShared({ auth, shallow = true }) {
  try {
    const stored = AuthRequest.isShallowAuthorized(auth);
    if (shallow && stored) return null;

    const payload = await AuthRequest.isAuthorized(auth);
    if (!payload) throw new Error("User not available or authorized");

    const user = payload && _.has(payload, "user") ? payload.user : null;
    if (!user) throw new Error("User not available or authorized");

    return user;
  } catch (e) {
    return null;
  }
}

export async function validateAuth({ state, store, dispatch: d, res = null } = {}, visibility = "private", shallow = true) {
  let auth = null;
  let dispatch = d;
  if (!_.isNil(store)) {
    /** Object is coming from the server (nextjs side) */
    auth = _.attempt(() => {
      const s = store.getState();
      return s.auth;
    });
    if (_.isError(auth)) auth = null;

    dispatch = store.dispatch;
  } else auth = state.auth;
  switch (visibility) {
    case "analytics":
      return validateEliteOnly({ auth, dispatch, res, tier: types.tier.access.analytics });
    case "private":
      return validatePrivateOnly({ auth, dispatch, res, shallow });
    case "public":
      return validatePublicOnly({ auth, dispatch, res, shallow });
    case "shared":
    default:
      return validateShared({ auth, shallow });
  }
}

export function getServerAuth(context) {
  if (_.isNil(context) || !_.has(context, "store")) return null;
  try {
    const { store } = context;
    const auth = _.attempt(() => {
      const s = store.getState();
      return s.auth;
    });
    return !_.isError(auth) ? auth : null;
  } catch (error) {
    return null;
  }
}
