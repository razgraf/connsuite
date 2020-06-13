import React, { useEffect } from "react";
import { PURGE } from "redux-persist";

function Leave() {
  useEffect(() => {
    window.location.href = "/";
  }, []);
  return <></>;
}

Leave.getInitialProps = async context => {
  try {
    const { store } = context;
    store.dispatch({ type: PURGE, result: () => null });
    context.flushReduxStateToCookies();
  } catch (e) {
    console.error(e);
  }

  return {};
};

export default Leave;
