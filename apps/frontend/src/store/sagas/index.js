import { all } from "redux-saga/effects";
import dataSaga from "./data";
import authSaga from "./auth";

export default function* rootSaga() {
  yield all([...dataSaga, ...authSaga]);
}
