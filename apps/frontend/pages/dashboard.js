import Dashboard from "../src/pages/platform/Dashboard";
import { validateAuth, updateAuth } from "../src/utils";

Dashboard.getInitialProps = async context => {
  await validateAuth(context, "private");
  updateAuth(context);

  return {};
};

export default Dashboard;
