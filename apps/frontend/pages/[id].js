import _ from "lodash";
import Profile from "../src/pages/platform/Profile/Viewer";
import { validateAuth } from "../src/utils";
import { UserRequest, AnalyticsRequest } from "../src/requests";
import { types } from "../src/constants";

Profile.getInitialProps = async context => {
  await validateAuth(context, "shared");
  try {
    const { store } = context;
    const auth = _.attempt(() => store.getState().auth);
    const identifier = _.get(context, "query.id");
    const data = await UserRequest.get({ auth, identifier });

    if (!_.isNil(data) && _.get(data, "user._id") && !_.get(data, "isSelf")) {
      AnalyticsRequest.visitCreate({ auth, targetId: _.get(data, "user._id"), type: types.visit.type.profile });
    }

    return { data: data.user, identifier, isSelf: data.isSelf };
  } catch (e) {
    console.error(e);
    return {};
  }
};
export default Profile;
