import ProfileManager from "../src/pages/platform/Profile/Manager";
import { validateAuth, updateAuth } from "../src/utils";

ProfileManager.getInitialProps = async context => {
  await validateAuth(context, "private", false);
  updateAuth(context);

  return {};
};
export default ProfileManager;
