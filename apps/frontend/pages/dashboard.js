import Dashboard from "../src/pages/platform/Dashboard";
import { validateAuth } from "../src/utils";

Dashboard.getInitialProps = async context => {
  console.log("Dashboard");
  await validateAuth(context, "private");
  return {};
};

export default Dashboard;
