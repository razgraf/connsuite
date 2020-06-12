import React from "react";
import NextApp from "next/app";
import { Provider } from "react-redux";
import { withReduxCookiePersist } from "next-redux-cookie-wrapper";
import withReduxSaga from "next-redux-saga";
import { PersistGate } from "redux-persist/integration/react";
import { ToastProvider } from "react-toast-notifications";
import { ThemeProvider, GlobalStyle } from "../src/themes";
import reduxStore, { persistConfig } from "../src/store";
import Toast, { ToastContainer } from "../src/components/atoms/Toast";

class App extends NextApp {
  static async getInitialProps({ Component, ctx }) {
    const pageProps = Component.getInitialProps ? await Component.getInitialProps(ctx) : {};
    return { pageProps };
  }

  render() {
    const { Component, pageProps, store } = this.props;

    return (
      <Provider store={store}>
        <PersistGate persistor={store.__PERSISTOR} loading={null}>
          <ThemeProvider>
            <GlobalStyle />
            <ToastProvider components={{ Toast, ToastContainer }}>
              <Component {...pageProps} />
            </ToastProvider>
          </ThemeProvider>
        </PersistGate>
      </Provider>
    );
  }
}

export default withReduxCookiePersist(reduxStore, { persistConfig })(withReduxSaga(App));
