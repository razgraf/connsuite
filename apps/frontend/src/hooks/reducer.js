import { useReducer } from "react";
import { loginReducer, registerReducer, networkCreateReducer } from "../reducers";

export function useLoginReducer() {
  const [state, dispatch] = useReducer(loginReducer.reducer, loginReducer.initial);
  return { ...loginReducer, state, dispatch };
}

export function useRegisterReducer() {
  const [state, dispatch] = useReducer(registerReducer.reducer, registerReducer.initial);
  return { ...registerReducer, state, dispatch };
}

export function useNetworkCreateReducer() {
  const [state, dispatch] = useReducer(networkCreateReducer.reducer, networkCreateReducer.initial);
  return { ...networkCreateReducer, state, dispatch };
}
