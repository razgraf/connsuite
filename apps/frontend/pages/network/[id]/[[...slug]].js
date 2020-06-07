import _ from "lodash";
import Visit from "../../../src/pages/presentation/Visit";
import { root } from "../../../src/constants";
import { getServerAuth } from "../../../src/utils";
import { NetworkRequest } from "../../../src/requests";

Visit.getInitialProps = async context => {
  const { res, query, params } = context;
  const auth = getServerAuth(context);
  const identifier = _.get(query, "id");

  try {
    const result = await NetworkRequest.get({ auth, networkId: identifier });
    if (_.isNil(result) || !_.has(result, "network") || !_.has(result.network, "url")) {
      throw new Error();
    } else {
      res.writeHead(302, { Location: _.get(result, "network.url") });
      res.end();
      return {};
    }
  } catch (e) {
    console.error(e);
    res.writeHead(302, { Location: root });
    res.end();
    return {};
  }
};

export default Visit;
