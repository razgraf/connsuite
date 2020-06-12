import Business from "../src/pages/platform/Business";
import { validateAuth, updateAuth } from "../src/utils";

Business.getInitialProps = async context => {
  await validateAuth(context, "private");
  updateAuth(context);

  return {};
};

export default Business;
