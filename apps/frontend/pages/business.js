import Business from "../src/pages/platform/Business";
import { validateAuth } from "../src/utils";

Business.getInitialProps = async context => {
  await validateAuth(context, "private");
  return {};
};

export default Business;
