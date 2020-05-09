import { useReducer } from "react";
import { loginReducer } from "../reducers";

export function useLoginReducer() {
  const [state, dispatch] = useReducer(loginReducer.reducer, loginReducer.initial);
  return { state, dispatch, actions: loginReducer.actions };
}
