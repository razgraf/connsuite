import ProfileManager from "../src/pages/platform/Profile/Manager";
import { validateAuth } from "../src/utils";

ProfileManager.getInitialProps = async context => {
  await validateAuth(context, "private", false);
  return {};
};
export default ProfileManager;