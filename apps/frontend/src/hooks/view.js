import _ from "lodash";
import { useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { redux, pages } from "../constants";

export function useCover() {
  const dispatch = useDispatch();
  const cover = useSelector(state => state.view.cover);

  const setOpen = useCallback(
    (isOpen = true) => {
      if (isOpen) dispatch({ type: redux.COVER_OPEN });
      else dispatch({ type: redux.COVER_CLOSE });
    },
    [dispatch],
  );

  const setNetwork = useCallback(
    network => {
      dispatch({ type: redux.COVER_NETWORK_SET, payload: { network } });
    },
    [dispatch],
  );

  return {
    isOpen: cover.isOpen,
    network: cover.network,
    setOpen,
    setNetwork,
  };
}

export function useModal(id) {
  const dispatch = useDispatch();
  const list = useSelector(state => state.view.modal.list);
  let modal = list.find(item => item.id === id);

  if (_.isNil(modal)) {
    modal = { id, isOpen: false };
    dispatch({
      type: redux.MODAL_REGISTER,
      payload: modal,
    });
  }

  const { isOpen } = modal;
  const setOpen = useCallback(
    (state = true) => {
      if (state) dispatch({ type: redux.MODAL_OPEN, payload: { id } });
      else dispatch({ type: redux.MODAL_CLOSE, payload: { id } });
    },
    [dispatch, id],
  );

  return {
    isOpen,
    setOpen,
  };
}

export function useHistory() {
  const router = useRouter();
  const dispatch = useDispatch();

  const history = useSelector(state => state.view.history);

  return {
    history,
    back: ({ fallback = null }) => {
      const route = history.length > 0 ? _.get(history, `[${history.length - 1}]route`) : fallback;
      router.push(route || pages.dashboard.root).then(() => dispatch({ type: redux.HISTORY_POP }));
    },
    push: () => dispatch({ type: redux.HISTORY_PUSH, payload: { route: router.pathname } }),
    pop: () => dispatch({ type: redux.HISTORY_POP }),
    clear: () => dispatch({ type: redux.HISTORY_CLEAR }),
  };
}
