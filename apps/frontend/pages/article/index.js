import ArticleManager from "../../src/pages/platform/Article/Manager/create.js";
import { validateAuth } from "../../src/utils";

ArticleManager.getInitialProps = async context => {
  await validateAuth(context, "private");
};

export default ArticleManager;
