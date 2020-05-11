import { useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
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
