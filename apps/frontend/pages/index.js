import Landing from "../src/pages/presentation/Landing";

import { validateAuth } from "../src/utils";

Landing.getInitialProps = async context => {
  await validateAuth(context, "public");
  return {};
};

export default Landing;
