import NetworkManager from "../../src/pages/platform/Network/Manager";
import { validateAuth } from "../../src/utils";

NetworkManager.getInitialProps = async context => {
  await validateAuth(context, "private");
  return {
    query: context.query,
  };
};

export default NetworkManager;
