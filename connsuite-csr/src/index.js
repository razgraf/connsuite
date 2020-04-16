import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./components/App/App";
import * as serviceWorker from "./serviceWorker";

import { createStore, applyMiddleware, compose } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import rootReducer from "./store/reducer/root";
import rootMiddleware from "./store/middleware/root";
import WebFont from "webfontloader";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(...rootMiddleware, thunk)));

WebFont.load({
  google: {
    families: [
      // 'Source Sans Pro:300,400,600,700,900',
      "Quicksand:300,400,500,700",
      "Montserrat:300,400,500,600,700,900",
    ],
  },
});

ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>,
  document.getElementById("root"),
);

serviceWorker.unregister();
