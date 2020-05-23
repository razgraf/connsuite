import NetworkManager from "../../src/pages/platform/Network/Manager/create";
import { validateAuth } from "../../src/utils";

NetworkManager.getInitialProps = async context => {
  await validateAuth(context, "private");
};

export default NetworkManager;
