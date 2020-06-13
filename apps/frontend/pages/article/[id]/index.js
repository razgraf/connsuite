import _ from "lodash";
import ArticleViewer from "../../../src/pages/platform/Article/Viewer";
import { redirectTo, getServerAuth, updateAuth } from "../../../src/utils";
import { ArticleRequest, AnalyticsRequest } from "../../../src/requests";
import { types, status } from "../../../src/constants";

ArticleViewer.getInitialProps = async context => {
  const { res, query } = context;
  const auth = getServerAuth(context);
  if (auth) updateAuth(context);
  const identifier = _.get(query, "id");

  let article = null;

  try {
    const result = await ArticleRequest.get({ auth, articleId: identifier });

    if (_.isNil(result) || !_.get(result, "article.type")) {
      throw new Error("Missing response");
    }

    article = _.get(result, "article");

    if (_.get(result, "article._id") && !_.get(result, "isSelf")) {
      AnalyticsRequest.visitCreate({ auth, targetId: _.get(result, "article._id"), type: types.visit.type.article });
    }

    if (_.get(result, "article.type") === types.article.type.external) {
      redirectTo(_.get(result, "article.url"), context);
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
    article,
  };
};

export default ArticleViewer;
