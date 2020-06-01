import _ from "lodash";
import Profile from "../src/pages/platform/Profile";
import { validateAuth } from "../src/utils";
import { UserRequest } from "../src/requests";

Profile.getInitialProps = async context => {
  await validateAuth(context, "shared");
  try {
    const { store } = context;
    const auth = _.attempt(() => store.getState().auth);
    const identifier = _.get(context, "query.id");
    const profile = await UserRequest.get({ auth, identifier });
    return { profile: profile.user, identifier };
  } catch (e) {
    console.error(e);
    return {};
  }
};
export default Profile;
