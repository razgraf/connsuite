import mLogin, { mActions as mActionsLogin, mStates as mStatesLogin } from "./login";

const connect = {
  mLogin,

  mActions: {
    login: mActionsLogin,
  },

  mStates: {
    login: mStatesLogin,
  },
};

export default connect;
