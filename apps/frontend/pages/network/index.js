import NetworkManager from "../../src/pages/platform/Network/Manager/create";
import { validateAuth, updateAuth } from "../../src/utils";

NetworkManager.getInitialProps = async context => {
  await validateAuth(context, "private");
  updateAuth(context);
};

export default NetworkManager;
