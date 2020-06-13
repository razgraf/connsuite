import NetworkManager from "../../../src/pages/platform/Network/Manager/edit";
import { validateAuth, updateAuth } from "../../../src/utils";

NetworkManager.getInitialProps = async context => {
  await validateAuth(context, "private");
  updateAuth(context);

  return {
    query: context.query,
  };
};

export default NetworkManager;
