import _ from "lodash";
import ArticleViewer from "../../../src/pages/platform/Article/Viewer";
import { getServerAuth } from "../../../src/utils";
import { ArticleRequest } from "../../../src/requests";
import { types, status } from "../../../src/constants";

ArticleViewer.getInitialProps = async context => {
  const { res, query } = context;
  const auth = getServerAuth(context);
  const identifier = _.get(query, "id");

  const data = null;

  try {
    const result = await ArticleRequest.get({ auth, articleId: identifier, query: { minimal: true } });
    if (_.isNil(result) || !_.get(result, "article.type")) {
      throw new Error();
    }
    if (_.get(result, "article.type") === types.article.type.external) {
      res.writeHead(status.FOUND, { Location: _.get(result, "article.url") });
      res.end();
      return {};
    }
  } catch (e) {
    console.error(e);
    res.statusCode = status.NOT_FOUND;
    return {
      query: null,
    };
  }

  return {
    query: context.query,
    data,
  };
};

export default ArticleViewer;
