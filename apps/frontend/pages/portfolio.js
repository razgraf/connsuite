import Portfolio from "../src/pages/platform/Portfolio";
import { validateAuth } from "../src/utils";

Portfolio.getInitialProps = async context => {
  await validateAuth(context, "private");
  return {};
};

export default Portfolio;
