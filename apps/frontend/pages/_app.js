import React from "react";
import NextApp from "next/app";
import { Provider } from "react-redux";
import { withReduxCookiePersist } from "next-redux-cookie-wrapper";
import { PersistGate } from "redux-persist/integration/react";

import { ThemeProvider, GlobalStyle } from "../src/themes";
import reduxStore from "../src/store";

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
            <Component {...pageProps} />
          </ThemeProvider>
        </PersistGate>
      </Provider>
    );
  }
}

export default withReduxCookiePersist(reduxStore)(App);
