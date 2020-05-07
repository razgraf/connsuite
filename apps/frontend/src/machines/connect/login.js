import _ from "lodash";
import { Machine, assign } from "xstate";
import { AuthRequest } from "../../requests";

const mStates = {
  idle: "idle",
  identify: "identify",
  connect: "connect",
  success: "success",
  failure: "failure",
};

/** Only the named actions coming from the prop chain */
const mActions = {
  approve: "approve",
};

async function attemptToConnect({ context, event }) {
  const payload = {
    vendor: _.get(context, "vendor"),
  };

  if (_.get(context, "vendor") === "GOOGLE") {
    return AuthRequest.google({
      ...payload,
      identity: _.get(context, "identity.tokenId"),
    });
  }
  if (_.get(context, "vendor") === "CLASSIC")
    return AuthRequest.register({
      ...payload,
      identity: event.identity,
    });

  throw new Error("Unknown vendor");
}

function isVendorClassic(__, event) {
  return _.get(event, "vendor") === "CLASSIC";
}

function isVendorGoogle(__, event) {
  return _.get(event, "vendor") === "GOOGLE";
}

const INVALIDATE = {
  target: "failure",
  actions: assign({
    error: () => "Unknown configuration",
  }),
};

const mLogin = Machine(
  {
    id: "connectLoginMachine",
    initial: "idle",
    context: {
      error: null,
      identity: null,
      vendor: null,
      data: null,
    },
    states: {
      [mStates.idle]: {
        on: {
          INITIALIZE: [
            {
              cond: "isVendorGoogle",
              target: mStates.identify,
            },
            {
              cond: "isVendorClassic",
              target: mStates.connect,
            },
            /** All identifier gates failed */
            { ...INVALIDATE },
          ],
        },
        exit: assign({
          vendor: (__, event) => event.vendor,
        }),
      },
      [mStates.identify]: {
        on: {
          SUCCESS: {
            actions: assign({
              identity: (__, event) => event.payload,
            }),
            target: mStates.connect,
          },
          FAILURE: {
            actions: assign({
              error: (__, event) => {
                console.error(event.error, event.details);
                return event.error;
              },
            }),
            target: mStates.failure,
          },
        },
      },
      [mStates.connect]: {
        invoke: {
          src: (context, event) => attemptToConnect({ context, event }),
          onDone: {
            actions: assign({
              data: (context, event) => event.data,
            }),
            target: mStates.success,
          },
          onError: {
            actions: assign({
              error: (context, event) => event.data,
            }),
            target: mStates.error,
          },
        },
      },
      [mStates.success]: {
        entry: [mActions.approve],
        on: {
          RESET: mStates.idle,
        },
      },
      [mStates.failure]: {
        on: {
          RESET: mStates.idle,
        },
      },
    },
  },

  {
    guards: {
      isVendorGoogle,
      isVendorClassic,
    },
  },
);

export { mActions, mStates };
export default mLogin;
