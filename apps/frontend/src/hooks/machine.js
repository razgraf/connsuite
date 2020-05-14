import _ from "lodash";
import { useMemo } from "react";
import { useMachine } from "@xstate/react";
import { connectX, networkCreateX } from "../xstates";
import { redirectTo } from "../utils";
import { redux, pages } from "../constants";

function connectActions(dispatch) {
  return {
    [connectX.actions.approve]: context => {
      dispatch({ type: redux.AUTH_USER_SET, payload: _.get(context, "data.user") || {} });
      dispatch({ type: redux.AUTH_TOKEN_SET, payload: { value: _.get(context, "data.token") } || {} });
      redirectTo(pages.dashboard.root);
    },
  };
}
export function useConnectMachine({ dispatch, type = "LOGIN" } = {}) {
  const piece = useMachine(connectX.machine, { actions: connectActions(dispatch), context: { type } });
  const machine = useMemo(
    () => ({
      ...connectX,
      current: piece[0],
      send: piece[1],
    }),
    [piece],
  );

  return machine;
}

function networkCreateActions({ dispatch, toast, router }) {
  return {
    [networkCreateX.actions.approve]: () => {
      toast.addToast("Network successfully created!", {
        appearance: "success",
        autoDismiss: true,
        autoDismissTimeout: 3000,
        onDismiss: () => {
          router.push(pages.dashboard.root);
        },
      });
    },
  };
}

export function useNetworkCreateMachine({ dispatch, router, toast, type = "CREATE" } = {}) {
  const piece = useMachine(networkCreateX.machine, {
    actions: networkCreateActions({ dispatch, toast, router }),
    context: { type },
  });

  const machine = useMemo(
    () => ({
      ...networkCreateX,
      current: piece[0],
      send: piece[1],
    }),
    [piece],
  );

  return machine;
}
