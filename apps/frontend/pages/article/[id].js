import ArticleViewer from "../../src/pages/platform/Article/Viewer";
import { validateAuth } from "../../src/utils";

ArticleViewer.getInitialProps = async context => {
  await validateAuth(context, "private");
  return {
    query: context.query,
  };
};

export default ArticleViewer;
