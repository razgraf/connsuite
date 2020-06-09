import Analytics from "../src/pages/platform/Analytics";
import { validateAuth } from "../src/utils";

Analytics.getInitialProps = async context => {
  const { elite } = await validateAuth(context, "analytics");
  return {
    elite,
  };
};

export default Analytics;
