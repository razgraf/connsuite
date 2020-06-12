import ArticleManager from "../../../src/pages/platform/Article/Manager/edit";
import { validateAuth, updateAuth } from "../../../src/utils";

ArticleManager.getInitialProps = async context => {
  await validateAuth(context, "private");
  updateAuth(context);
  return {
    query: context.query,
  };
};

export default ArticleManager;
