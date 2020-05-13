import { useReducer } from "react";
import { loginReducer, registerReducer, createNetworkReducer } from "../reducers";

export function useLoginReducer() {
  const [state, dispatch] = useReducer(loginReducer.reducer, loginReducer.initial);
  return { ...loginReducer, state, dispatch };
}

export function useRegisterReducer() {
  const [state, dispatch] = useReducer(registerReducer.reducer, registerReducer.initial);
  return { ...registerReducer, state, dispatch };
}

export function useCreateNetworkReducer() {
  const [state, dispatch] = useReducer(createNetworkReducer.reducer, createNetworkReducer.initial);
  return { ...createNetworkReducer, state, dispatch };
}
