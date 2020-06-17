import _ from "lodash";
import { useMemo } from "react";
import { useMachine } from "@xstate/react";
import { useToasts } from "react-toast-notifications";
import { connectX } from "../../machines";
import { redirectTo } from "../../utils";
import { redux, pages } from "../../constants";

function connectActions(dispatch, toast) {
  return {
    [connectX.actions.approve]: context => {
      dispatch({ type: redux.AUTH_USER_SET, payload: _.get(context, "data.user") || {} });
      dispatch({ type: redux.AUTH_TOKEN_SET, payload: { value: _.get(context, "data.token") } || {} });
      toast.addToast("Welcome to ConnSuite", {
        appearance: "success",
        autoDismiss: true,
        autoDismissTimeout: 1500,
        onDismiss: () => {
          redirectTo(pages.dashboard.root);
        },
      });
    },
  };
}
export function useConnectMachine({ dispatch, type = "LOGIN" } = {}) {
  const toast = useToasts();
  const piece = useMachine(connectX.machine, { actions: connectActions(dispatch, toast), context: { type } });
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
