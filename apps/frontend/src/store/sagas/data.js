import { put, takeEvery } from "redux-saga/effects";

import { actions, sagas } from "../../constants";

export function* test({ payload }) {
  console.log(payload);
  try {
    yield put({ type: actions.SET, payload: { value: 1 } });
  } catch (e) {
    console.error(e);
  }
}

const dataSaga = [takeEvery(sagas.TEST, test)];
export default dataSaga;
