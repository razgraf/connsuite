import _ from "lodash";
import { useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { useMachine } from "@xstate/react";
import { useToasts } from "react-toast-notifications";
import { connectX, networkCreateX } from "../xstates";
import { redirectTo } from "../utils";
import { redux, pages, sagas } from "../constants";

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

function networkCreateActions({ auth, dispatch, toast, router }) {
  return {
    [networkCreateX.actions.approve]: () => {
      toast.addToast("Network successfully created!", {
        appearance: "success",
        autoDismiss: true,
        autoDismissTimeout: 2500,
        onDismiss: () => {
          router.push(pages.portfolio.root);
          const username = _.attempt(() => auth.user.usernames.find(item => item.isPrimary === true).value);
          dispatch({ type: sagas.NETWORKS_LIST, payload: { auth, user: { username: !_.isError(username) ? username : null } } });
        },
      });
    },
  };
}

export function useNetworkCreateMachine({ type = "CREATE" } = {}) {
  const auth = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const router = useRouter();
  const toast = useToasts();
  const piece = useMachine(networkCreateX.machine, {
    actions: networkCreateActions({ auth, dispatch, toast, router }),
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
