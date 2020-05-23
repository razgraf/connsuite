import _ from "lodash";
import { call, put, takeLatest } from "redux-saga/effects";
import { NetworkRequest, ArticleRequest } from "../../requests";
import { redux, sagas } from "../../constants";

export function* test() {
  try {
    yield put({ type: redux.TEST, payload: { value: 1 } });
  } catch (e) {
    console.error(e);
  }
}

/**
 * @param {object} p0
 * @param {object} p0.payload
 * @param {object} p0.payload.auth - Authorization (persisted)
 * @param {object} p0.payload.user - User object containing _id or username
 * @param {object} p0.payload.filters - Filter object containing limit, offset
 * @param {object} [p0.callback]
 * @param {object} [p0.clear]
 */
export function* networkList({ payload, callback, clear = true }) {
  try {
    yield put({ type: redux.NETWORKS_SET_IS_LOADING, payload: { isLoading: true } });
    const result = yield call(NetworkRequest.list, payload);
    const list = _.get(result, "networks") || [];
    if (clear) yield put({ type: redux.NETWORKS_SET_LIST, payload: { list } });
    else yield put({ type: redux.NETWORKS_PUSH_LIST, payload: { list } });
  } catch (e) {
    console.error(e);
  } finally {
    yield put({ type: redux.NETWORKS_SET_IS_LOADING, payload: { isLoading: false } });
    if (_.isFunction(callback)) callback();
  }
}

/**
 * @param {object} p0
 * @param {object} p0.payload
 * @param {object} p0.payload.auth - Authorization (persisted)
 * @param {object} p0.payload.user - User object containing _id or username
 * @param {object} p0.payload.filters - Filter object containing limit, offset
 * @param {object} [p0.callback]
 * @param {object} [p0.clear]
 */
export function* articleList({ payload, callback, clear = true }) {
  try {
    yield put({ type: redux.ARTICLES_SET_IS_LOADING, payload: { isLoading: true } });
    const result = yield call(ArticleRequest.list, payload);
    const list = _.get(result, "articles") || [];
    if (clear) yield put({ type: redux.ARTICLES_SET_LIST, payload: { list } });
    else yield put({ type: redux.ARTICLES_PUSH_LIST, payload: { list } });
  } catch (e) {
    console.error(e);
  } finally {
    yield put({ type: redux.ARTICLES_SET_IS_LOADING, payload: { isLoading: false } });
    if (_.isFunction(callback)) callback();
  }
}

export default [takeLatest(sagas.NETWORKS_LIST, networkList), takeLatest(sagas.ARTICLES_LIST, articleList)];
