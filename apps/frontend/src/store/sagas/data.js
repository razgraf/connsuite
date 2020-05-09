import { put, takeEvery } from "redux-saga/effects";

import { redux, sagas } from "../../constants";

export function* test({ payload }) {
  console.log(payload);
  try {
    yield put({ type: redux.SET, payload: { value: 1 } });
  } catch (e) {
    console.error(e);
  }
}

const dataSaga = [takeEvery(sagas.TEST, test)];
export default dataSaga;
