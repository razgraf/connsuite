import Profile from "../src/pages/platform/Profile";
import { validateAuth } from "../src/utils";

Profile.getInitialProps = async context => {
  await validateAuth(context, "shared");
};
export default Profile;
