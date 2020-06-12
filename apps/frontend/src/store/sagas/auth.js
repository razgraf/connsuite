import _ from "lodash";
import { call, put, takeLatest } from "redux-saga/effects";
import { AuthRequest } from "../../requests";
import { redux, sagas } from "../../constants";

/**
 * @param {object} p0
 * @param {object} p0.payload
 * @param {object} p0.payload.auth - Authorization (persisted)
 * @param {object} [p0.callback]
 */
export function* authUpdate({ payload, callback }) {
  let isDiff = true;
  try {
    const result = yield call(AuthRequest.getStatus, payload);
    if (!result || _.isNil(result)) return;

    const user = _.get(result, "user") || {};
    if (!user || _.isNil(user)) return;

    isDiff = !_.isEqual(_.get(payload, "auth.user"), user);
    if (isDiff) yield put({ type: redux.AUTH_USER_SET, payload: user || {} });
  } catch (e) {
    console.error(e);
  } finally {
    if (_.isFunction(callback)) callback(isDiff);
  }
}

export default [takeLatest(sagas.AUTH_UPDATE, authUpdate)];
