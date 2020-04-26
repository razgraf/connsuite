import React from "react";
import NextApp from "next/app";
// import { DataStore, DataProvider } from "../src/store";
import { ThemeProvider, GlobalStyle } from "../src/themes";

class App extends NextApp {
  render() {
    const { Component, pageProps } = this.props;
    return (
      // <DataProvider store={DataStore}>
      <ThemeProvider>
        <GlobalStyle />
        <Component {...pageProps} />
      </ThemeProvider>
      // </DataProvider>
    );
  }
}

export default App;
