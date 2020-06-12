import _ from "lodash";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { redux, sagas } from "../constants";
import { NetworkRequest, SkillRequest, CategoryRequest } from "../requests";

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
          if (result && result.networks) result.networks.sort((a, b) => a.title > b.title);
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
export function useSelfNetworks() {
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
export function useSelfArticles() {
  const articles = useSelector(state => state.portfolio.articles);
  const auth = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const { isLoading, isFetched } = articles;

  useEffect(() => {
    if (!isLoading && !isFetched) {
      dispatch({ type: redux.ARTICLES_SET_IS_FETCHED, payload: { isFetched: true } });
      const username = _.attempt(() => auth.user.usernames.find(item => item.isPrimary === true).value);
      dispatch({
        type: sagas.ARTICLES_LIST,
        payload: { auth, user: { username: !_.isError(username) ? username : null } },
      });
    }
    return () => {};
  }, [auth, isLoading, isFetched, dispatch]);

  return articles;
}

export function useDefaultSkills() {
  const skills = useSelector(state => state.resource.skills);
  const dispatch = useDispatch();
  const { isLoading, isFetched } = skills;
  useEffect(() => {
    if (!isLoading && !isFetched) {
      (async () => {
        dispatch({ type: redux.RESOURCE_DEFAULT_SKILLS_SET, payload: { isFetched: true, isLoading: true } });
        let result = { skills: [] };
        try {
          result = await SkillRequest.listDefault();
          if (result && result.skills) result.skills.sort((a, b) => a.title > b.title);
        } catch (e) {
          console.error(e);
        }

        dispatch({
          type: redux.RESOURCE_DEFAULT_SKILLS_SET,
          payload: {
            list: result.skills,
            isLoading: false,
          },
        });
      })();
    }
    return () => {};
  }, [isLoading, isFetched, dispatch]);

  return skills;
}

export function useDefaultCategories() {
  const categories = useSelector(state => state.resource.categories);
  const dispatch = useDispatch();
  const { isLoading, isFetched } = categories;
  useEffect(() => {
    if (!isLoading && !isFetched) {
      (async () => {
        dispatch({ type: redux.RESOURCE_DEFAULT_CATEGORIES_SET, payload: { isFetched: true, isLoading: true } });
        let result = { categories: [] };
        try {
          result = await CategoryRequest.listDefault();
          if (result && result.categories) result.categories.sort((a, b) => a.title > b.title);
        } catch (e) {
          console.error(e);
        }

        dispatch({
          type: redux.RESOURCE_DEFAULT_CATEGORIES_SET,
          payload: {
            list: result.categories,
            isLoading: false,
          },
        });
      })();
    }
    return () => {};
  }, [isLoading, isFetched, dispatch]);

  return categories;
}
