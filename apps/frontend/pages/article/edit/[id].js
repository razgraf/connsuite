import ArticleManager from "../../../src/pages/platform/Article/Manager/edit";
import { validateAuth } from "../../../src/utils";

ArticleManager.getInitialProps = async context => {
  await validateAuth(context, "private");
  return {
    query: context.query,
  };
};

export default ArticleManager;
