import Landing from "../src/pages/presentation/Landing";

import { validateAuth } from "../src/utils";

Landing.getInitialProps = async context => {
  console.log(context.store.getState());
  await validateAuth(context, "public");
  return {};
};

export default Landing;
