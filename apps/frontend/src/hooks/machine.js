import _ from "lodash";
import { useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { useMachine } from "@xstate/react";
import { useToasts } from "react-toast-notifications";
import { connectX, networkCreateX, networkEditX, networkRemoveX, articleCreateX, articleRemoveX } from "../xstates";
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
          const username = _.attempt(() => auth.user.usernames.find(item => item.isPrimary === true).value);
          dispatch({ type: sagas.NETWORKS_LIST, payload: { auth, user: { username: !_.isError(username) ? username : null } } });
          router.push(pages.portfolio.root);
        },
      });
    },
  };
}

export function useNetworkCreateMachine() {
  const auth = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const router = useRouter();
  const toast = useToasts();
  const piece = useMachine(networkCreateX.machine, {
    actions: networkCreateActions({ auth, dispatch, toast, router }),
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

function networkEditActions({ auth, dispatch, toast, router, reducer }) {
  return {
    [networkEditX.actions.approve]: () => {
      toast.addToast("Network successfully modified!", {
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
    [networkEditX.actions.bind]: context => {
      const network = _.get(context, "data.network");
      const binder = {
        type: _.get(network, "type"),
        title: _.get(network, "title"),
        username: _.get(network, "username"),
        url: _.get(network, "url"),
        description: _.get(network, "description"),
        icon: {
          name: "Network Icon",
          preview: _.get(network, "icon.url"),
        },
      };
      reducer.dispatch({
        type: reducer.actions.BIND,
        payload: binder,
      });
    },
  };
}

export function useNetworkEditMachine({ networkId, reducer }) {
  const auth = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const router = useRouter();
  const toast = useToasts();
  const piece = useMachine(networkEditX.machine, {
    actions: networkEditActions({ auth, dispatch, toast, router, reducer }),
    context: { networkId, auth },
  });

  const machine = useMemo(
    () => ({
      ...networkEditX,
      current: piece[0],
      send: piece[1],
    }),
    [piece],
  );

  return machine;
}

function networkRemoveActions({ auth, dispatch, toast, onSuccess }) {
  return {
    [networkRemoveX.actions.approve]: () => {
      const username = _.attempt(() => auth.user.usernames.find(item => item.isPrimary === true).value);
      dispatch({ type: sagas.NETWORKS_LIST, payload: { auth, user: { username: !_.isError(username) ? username : null } } });
      toast.addToast("Network removed.", {
        appearance: "success",
        autoDismiss: true,
        autoDismissTimeout: 2000,
        onDismiss: () => {
          onSuccess();
        },
      });
    },
  };
}

export function useNetworkRemoveMachine({ onSuccess = () => {} }) {
  const auth = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const toast = useToasts();
  const piece = useMachine(networkRemoveX.machine, {
    actions: networkRemoveActions({ auth, dispatch, toast, onSuccess }),
  });

  const machine = useMemo(
    () => ({
      ...networkRemoveX,
      current: piece[0],
      send: piece[1],
    }),
    [piece],
  );

  return machine;
}

function articleCreateActions({ auth, dispatch, toast, router }) {
  return {
    [articleCreateX.actions.approve]: () => {
      toast.addToast("Article successfully created!", {
        appearance: "success",
        autoDismiss: true,
        autoDismissTimeout: 2500,
        onDismiss: () => {
          const username = _.attempt(() => auth.user.usernames.find(item => item.isPrimary === true).value);
          dispatch({ type: sagas.ARTICLES_LIST, payload: { auth, user: { username: !_.isError(username) ? username : null } } });
          router.push(pages.portfolio.root);
        },
      });
    },
  };
}

export function useArticleCreateMachine() {
  const auth = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const router = useRouter();
  const toast = useToasts();
  const piece = useMachine(articleCreateX.machine, {
    actions: articleCreateActions({ auth, dispatch, toast, router }),
  });

  const machine = useMemo(
    () => ({
      ...articleCreateX,
      current: piece[0],
      send: piece[1],
    }),
    [piece],
  );

  return machine;
}

function articleRemoveActions({ auth, dispatch, toast, onSuccess }) {
  return {
    [articleRemoveX.actions.approve]: () => {
      const username = _.attempt(() => auth.user.usernames.find(item => item.isPrimary === true).value);
      dispatch({ type: sagas.ARTICLES_LIST, payload: { auth, user: { username: !_.isError(username) ? username : null } } });
      toast.addToast("Article removed.", {
        appearance: "success",
        autoDismiss: true,
        autoDismissTimeout: 2000,
        onDismiss: () => {
          onSuccess();
        },
      });
    },
  };
}

export function useArticleRemoveMachine({ onSuccess = () => {} }) {
  const auth = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const toast = useToasts();
  const piece = useMachine(articleRemoveX.machine, {
    actions: articleRemoveActions({ auth, dispatch, toast, onSuccess }),
  });

  const machine = useMemo(
    () => ({
      ...articleRemoveX,
      current: piece[0],
      send: piece[1],
    }),
    [piece],
  );

  return machine;
}
