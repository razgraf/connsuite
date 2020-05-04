import login, { states as loginStates } from "./login";

const connect = {
  login,

  states: {
    login: loginStates,
  },
};

export default connect;
