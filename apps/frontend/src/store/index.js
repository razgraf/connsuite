import { createStore, applyMiddleware, compose } from "redux";
import { createLogger } from "redux-logger";
import createSagaMiddleware from "redux-saga";
import { persistStore, persistReducer, createMigrate } from "redux-persist";
// import localStorage from "redux-persist/lib/storage";
import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";

import { CookieStorage } from "redux-persist-cookie-storage";
import Cookies from "cookies-js";

import migrations from "./migrations";
import rootReducer from "./reducers";
import rootSaga from "./sagas";

export default initial => {
  let store;

  const logger = createLogger();
  const isClient = typeof window !== "undefined";

  const sagaMiddleware = createSagaMiddleware();
  const persistedReducer = persistReducer(
    {
      key: "root",
      version: 0,
      storage: new CookieStorage(Cookies, {}),
      stateReconciler: autoMergeLevel2,
      migrate: createMigrate(migrations, { debug: true }),
      whitelist: ["auth"],
      blacklist: ["data"],
    },
    rootReducer,
  );

  if (isClient) {
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    store = createStore(persistedReducer, initial, composeEnhancers(applyMiddleware(sagaMiddleware, logger)));
    store.__PERSISTOR = persistStore(store);
  } else {
    store = createStore(rootReducer, initial, compose(applyMiddleware(sagaMiddleware)));
  }

  store.sagaTask = sagaMiddleware.run(rootSaga);

  return store;
};
