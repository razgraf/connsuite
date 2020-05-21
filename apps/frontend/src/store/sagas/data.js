import _ from "lodash";
import { call, put, takeEvery, takeLatest } from "redux-saga/effects";
import { NetworkRequest } from "../../requests";
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
export function* networkList({ payload, callback, clear = false }) {
  console.log("networkList", payload, callback, clear);
  try {
    yield put({ type: redux.NETWORKS_SET_IS_LOADING, payload: { isLoading: true } });
    if (clear) yield put({ type: redux.NETWORKS_CLEAR_LIST });
    const result = yield call(NetworkRequest.list, payload);
    const list = _.get(result, "networks") || [];
    if (clear) yield put({ type: redux.NETWORKS_SET_LIST, payload: { list } });
    else yield put({ type: redux.NETWORKS_PUSH_LIST, payload: { list } });
    if (_.isFunction(callback)) callback({ list });
  } catch (e) {
    console.error(e);
  }

  yield put({ type: redux.NETWORKS_SET_IS_LOADING, payload: { isLoading: false } });
}

export default [takeLatest(sagas.NETWORKS_LIST, networkList)];
