import { createStore, applyMiddleware, compose } from "redux";
// import { createLogger } from "redux-logger";
import createSagaMiddleware from "redux-saga";
import { persistStore, persistReducer, createMigrate } from "redux-persist";
import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";
import storage from "redux-persist/lib/storage";

import migrations from "./migrations";
import rootReducer from "./reducers";
import rootSaga from "./sagas";

export default initial => {
  let store;

  const isClient = typeof window !== "undefined";

  const sagaMiddleware = createSagaMiddleware();

  const persistedReducer = persistReducer(
    {
      key: "root",
      version: -1,
      storage,
      stateReconciler: autoMergeLevel2,
      migrate: createMigrate(migrations, { debug: true }),
      whitelist: ["auth"],
      blacklist: ["portfolio", "resource", "view"],
    },
    rootReducer,
  );

  if (isClient) {
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    store = createStore(persistedReducer, initial, composeEnhancers(applyMiddleware(sagaMiddleware /** ,createLogger() */)));
    store.__PERSISTOR = persistStore(store);
  } else {
    store = createStore(rootReducer, initial, compose(applyMiddleware(sagaMiddleware)));
  }

  store.sagaTask = sagaMiddleware.run(rootSaga);

  return store;
};
