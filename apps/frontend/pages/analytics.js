import Analytics from "../src/pages/platform/Analytics";
import { validateAuth, updateAuth } from "../src/utils";

Analytics.getInitialProps = async context => {
  const { elite } = await validateAuth(context, "analytics");
  updateAuth(context);

  return {
    elite,
  };
};

export default Analytics;
