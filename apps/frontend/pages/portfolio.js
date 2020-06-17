import Portfolio from "../src/pages/platform/Portfolio";
import { validateAuth, updateAuth } from "../src/utils";

Portfolio.getInitialProps = async context => {
  await validateAuth(context, "private");
  updateAuth(context);

  return {};
};

export default Portfolio;
