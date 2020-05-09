import _ from "lodash";
import { useMemo } from "react";
import { useMachine } from "@xstate/react";
import { loginX } from "../xstates";
import { redirectTo } from "../utils";
import { redux, pages } from "../constants";

function loginActions(dispatch) {
  return {
    [loginX.actions.approve]: mContext => {
      console.log(mContext);
      dispatch({ type: redux.AUTH_USER_SET, payload: _.get(mContext, "data.user") || {} });
      dispatch({ type: redux.AUTH_TOKEN_SET, payload: { value: _.get(mContext, "data.token") } || {} });
      redirectTo(pages.dashboard.root);
    },
  };
}

export function useLoginMachine(store) {
  const piece = useMachine(loginX.machine, { actions: loginActions(store.dispatch) });
  const machine = useMemo(
    () => ({
      ...loginX,
      current: piece[0],
      send: piece[1],
    }),
    [piece],
  );

  return machine;
}
