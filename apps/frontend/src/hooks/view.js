import { useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { redux } from "../constants";

export function useCover() {
  const dispatch = useDispatch();
  const cover = useSelector(state => state.view.cover);

  const setOpen = useCallback((isOpen = true) => {
    if (isOpen) dispatch({ type: redux.COVER_OPEN });
    else dispatch({ type: redux.COVER_CLOSE });
  }, []);

  const setNetwork = useCallback(network => {
    dispatch({ type: redux.COVER_NETWORK_SET, payload: { network } });
  }, []);

  return {
    isOpen: cover.isOpen,
    network: cover.network,
    setOpen,
    setNetwork,
  };
}

export function useHistory() {
  const router = useRouter();
  const dispatch = useDispatch();

  const history = useSelector(state => state.view.history);

  return {
    history,
    push: () => dispatch({ type: redux.HISTORY_PUSH, payload: { route: router.pathname } }),
    pop: () => dispatch({ type: redux.HISTORY_POP }),
    clear: () => dispatch({ type: redux.HISTORY_CLEAR }),
  };
}
