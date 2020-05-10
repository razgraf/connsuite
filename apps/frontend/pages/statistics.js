import Statistics from "../src/pages/platform/Statistics";
import { validateAuth } from "../src/utils";

Statistics.getInitialProps = async context => {
  await validateAuth(context, "private");
  return {};
};

export default Statistics;
