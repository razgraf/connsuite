import _ from "lodash";
import { Machine, assign } from "xstate";
import { AuthRequest } from "../../requests";

const states = {
  idle: "idle",
  identify: "identify",
  connect: "connect",
  success: "success",
  failure: "failure",
};

async function requestUserProfile({ context, event }) {
  const payload = {
    vendor: _.get(context, "vendor"),
  };

  if (_.get(context, "vendor") === "GOOGLE")
    return AuthRequest.google({
      ...payload,
      identity: _.get(context, "identity.tokenId"),
    });

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

const login = Machine(
  {
    id: "connectLoginMachine",
    initial: "idle",
    context: {
      error: null,
      identity: null,
      vendor: null,
      user: null,
    },
    states: {
      [states.idle]: {
        on: {
          INITIALIZE: [
            {
              cond: "isVendorGoogle",
              target: states.identify,
            },
            {
              cond: "isVendorClassic",
              target: states.connect,
            },
            /** All identifier gates failed */
            { ...INVALIDATE },
          ],
        },
        exit: assign({
          vendor: (__, event) => event.vendor,
        }),
      },
      [states.identify]: {
        on: {
          SUCCESS: {
            actions: assign({
              identity: (__, event) => {
                console.log("identify.success.identity", event);
                return event.payload;
              },
            }),
            target: states.connect,
          },
          FAILURE: {
            actions: assign({
              error: (__, event) => {
                console.error(event.error, event.details);
                return event.error;
              },
            }),
            target: states.failure,
          },
        },
      },
      [states.connect]: {
        invoke: {
          src: (context, event) => requestUserProfile({ context, event }),
          onDone: {
            actions: assign({
              user: (context, event) => event.data,
            }),
            target: states.success,
          },
          onError: {
            actions: assign({
              error: (context, event) => event.data,
            }),
            target: states.error,
          },
        },
      },
      [states.success]: {
        on: {
          RESET: states.idle,
        },
      },
      [states.failure]: {
        on: {
          RESET: states.idle,
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

export default login;
export { states };
