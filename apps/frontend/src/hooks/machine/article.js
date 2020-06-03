import _ from "lodash";
import { useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { useMachine } from "@xstate/react";
import { useToasts } from "react-toast-notifications";
import { articleCreateX, articleRemoveX, articleEditX } from "../../xstates";
import { pages, sagas } from "../../constants";
import { ArticleRequest } from "../../requests";
import { useDataListMachine } from "./atoms";

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

function articleEditActions({ auth, dispatch, toast, router, reducer }) {
  return {
    [articleEditX.actions.approve]: () => {
      toast.addToast("Article successfully modified!", {
        appearance: "success",
        autoDismiss: true,
        autoDismissTimeout: 2500,
        onDismiss: () => {
          router.push(pages.portfolio.root);
          const username = _.attempt(() => auth.user.usernames.find(item => item.isPrimary === true).value);
          dispatch({ type: sagas.ARTICLES_LIST, payload: { auth, user: { username: !_.isError(username) ? username : null } } });
        },
      });
    },
    [articleEditX.actions.bind]: context => {
      const article = _.get(context, "data.article");
      const binder = {
        type: _.get(article, "type"),
        title: _.get(article, "title"),
        skills: _.get(article, "skills"),
        categories: _.get(article, "categories"),
        url: _.get(article, "url"),
        content: _.attempt(() => JSON.parse(_.get(article, "content"))) || {},
        cover: {
          preview: _.get(article, "cover.url"),
        },
      };
      reducer.dispatch({
        type: reducer.actions.BIND,
        payload: binder,
      });
    },
  };
}

export function useArticleEditMachine({ articleId, reducer }) {
  const auth = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const router = useRouter();
  const toast = useToasts();
  const piece = useMachine(articleEditX.machine, {
    actions: articleEditActions({ auth, dispatch, toast, router, reducer }),
    context: { articleId, auth },
  });

  const machine = useMemo(
    () => ({
      ...articleEditX,
      current: piece[0],
      send: piece[1],
    }),
    [piece],
  );

  return machine;
}

export function useArticlesMachine({ onSuccess = () => {} } = {}) {
  return useDataListMachine({ resource: "articles", request: ArticleRequest.list, onSuccess });
}
