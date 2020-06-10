import _ from "lodash";
import Visit from "../../../src/pages/presentation/Visit";
import { getServerAuth } from "../../../src/utils";
import { NetworkRequest, AnalyticsRequest } from "../../../src/requests";
import { root, types, status } from "../../../src/constants";

Visit.getInitialProps = async context => {
  const { res, query } = context;
  const auth = getServerAuth(context);
  const identifier = _.get(query, "id");

  try {
    const result = await NetworkRequest.get({ auth, networkId: identifier, query: { minimal: true } });
    if (_.isNil(result) || !_.get(result, "network.url")) {
      throw new Error();
    } else {
      if (_.get(result, "network._id") && !_.get(result, "isSelf")) {
        AnalyticsRequest.visitCreate({ auth, targetId: _.get(result, "network._id"), type: types.visit.type.network });
      }

      res.writeHead(status.FOUND, { Location: _.get(result, "network.url") });
      res.end();
      return {};
    }
  } catch (e) {
    console.error(e);
    res.writeHead(status.FOUND, { Location: root });
    res.end();
    return {};
  }
};

export default Visit;
