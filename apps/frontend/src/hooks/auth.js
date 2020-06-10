import { useSelector, useDispatch } from "react-redux";
import { validateAuth } from "../utils";
import { AuthRequest } from "../requests";

/**
 *
 * @param {("public"|"private"|"shared")} visibility - public ONLY (redirect to private is user allowed), private ONLY (redirect to public if user is not allowed), shared (don't redirect, but identify user)
 * @param {boolean} shallow - it false, wait for the backend confirmation of authenthicity too
 */
export function useAuth(visibility, shallow = true) {
  const auth = useSelector(state => state.auth);
  const dispatch = useDispatch();

  validateAuth({ state: { auth }, dispatch }, visibility, shallow);
}

export function useShallowAuth() {
  const auth = useSelector(state => state.auth);
  return AuthRequest.isShallowAuthorized(auth);
}
