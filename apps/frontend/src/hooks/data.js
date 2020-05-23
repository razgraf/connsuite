import _ from "lodash";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { redux, sagas } from "../constants";
import { NetworkRequest } from "../requests";

export function useExternalNetworks() {
  const external = useSelector(state => state.resource.networks);
  const dispatch = useDispatch();
  const { isLoading, isFetched } = external;
  useEffect(() => {
    if (!isLoading && !isFetched) {
      (async () => {
        dispatch({ type: redux.RESOURCE_EXTERNAL_NETWORKS_SET, payload: { isFetched: true, isLoading: true } });
        let result = { networks: [] };
        try {
          result = await NetworkRequest.listExternal();
        } catch (e) {
          console.error(e);
        }

        dispatch({
          type: redux.RESOURCE_EXTERNAL_NETWORKS_SET,
          payload: {
            list: result.networks,
            isLoading: false,
          },
        });
      })();
    }
    return () => {};
  }, [isLoading, isFetched, dispatch]);

  return external;
}

/**
 * Retrieve initial *personal* networks from storage or request them is missing.
 * It doesn't take into account limit or offset.
 */
export function useNetworks() {
  const networks = useSelector(state => state.portfolio.networks);
  const auth = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const { isLoading, isFetched } = networks;

  useEffect(() => {
    if (!isLoading && !isFetched) {
      dispatch({ type: redux.NETWORKS_SET_IS_FETCHED, payload: { isFetched: true } });
      const username = _.attempt(() => auth.user.usernames.find(item => item.isPrimary === true).value);
      dispatch({ type: sagas.NETWORKS_LIST, payload: { auth, user: { username: !_.isError(username) ? username : null } } });
    }
    return () => {};
  }, [auth, isLoading, isFetched, dispatch]);

  return networks;
}

/**
 * Retrieve initial *personal* articles from storage or request them is missing.
 * It doesn't take into account limit or offset.
 */
export function useArticles() {
  const articles = useSelector(state => state.portfolio.articles);
  const auth = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const { isLoading, isFetched } = articles;

  useEffect(() => {
    if (!isLoading && !isFetched) {
      dispatch({ type: redux.ARTICLES_SET_IS_FETCHED, payload: { isFetched: true } });
      const username = _.attempt(() => auth.user.usernames.find(item => item.isPrimary === true).value);
      dispatch({ type: sagas.ARTICLES_LIST, payload: { auth, user: { username: !_.isError(username) ? username : null } } });
    }
    return () => {};
  }, [auth, isLoading, isFetched, dispatch]);

  return articles;
}
