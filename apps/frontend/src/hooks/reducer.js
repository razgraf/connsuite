import { useReducer } from "react";
import { loginReducer, registerReducer, networkReducer, articleReducer } from "../reducers";

export function useLoginReducer() {
  const [state, dispatch] = useReducer(loginReducer.reducer, loginReducer.initial);
  return { ...loginReducer, state, dispatch };
}

export function useRegisterReducer() {
  const [state, dispatch] = useReducer(registerReducer.reducer, registerReducer.initial);
  return { ...registerReducer, state, dispatch };
}

export function useNetworkReducer() {
  const [state, dispatch] = useReducer(networkReducer.reducer, networkReducer.initial);
  return { ...networkReducer, state, dispatch };
}

export function useArticleReducer() {
  const [state, dispatch] = useReducer(articleReducer.reducer, articleReducer.initial);
  return { ...articleReducer, state, dispatch };
}
