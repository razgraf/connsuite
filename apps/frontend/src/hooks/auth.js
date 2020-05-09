import { useEffect } from "react";
import { useStore } from "react-redux";
import { validateAuth } from "../utils";

/**
 *
 * @param {{ store: * }}
 * @param {("public"|"private"|"shared")} visibility - public ONLY (redirect to private is user allowed), private ONLY (redirect to public if user is not allowed), shared (don't redirect, but identify user)
 */
export function useAuth(visibility, shallow = true) {
  const store = useStore();

  useEffect(() => {
    validateAuth({ store }, visibility, shallow);
    return () => {};
  }, [store, visibility, shallow]);
}
