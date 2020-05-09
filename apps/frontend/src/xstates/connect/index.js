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

const events = {
  initialize: "initialize",
  reset: "reset",
  success: "success",
  failure: "failure",
};

/** Only the named actions coming from the prop chain */
const actions = {
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
  if (_.get(context, "vendor") === "CLASSIC") {
    if (_.get(context, "type") === "LOGIN")
      return AuthRequest.login({
        ...event.identity,
      });
    else if (_.get(context, "type") === "REGISTER") {
      console.log(event);
      return AuthRequest.register({
        ...event.identity,
      });
    }
  }

  throw new Error("Unknown vendor");
}

function isVendorClassic(__, event) {
  return _.get(event, "vendor") === "CLASSIC";
}

function isVendorGoogle(__, event) {
  return _.get(event, "vendor") === "GOOGLE";
}

const INVALIDATE = {
  target: states.failure,
  actions: assign({
    error: () => "Unknown configuration",
  }),
};

const machine = Machine(
  {
    id: "connectLoginMachine",
    initial: "idle",
    context: {
      data: null,
      error: null,
      identity: null,
      type: "LOGIN",
      vendor: null,
    },
    states: {
      [states.idle]: {
        on: {
          [events.initialize]: [
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
          data: null,
          identity: null,
          error: null,
        }),
      },
      [states.identify]: {
        on: {
          [events.success]: {
            actions: assign({
              identity: (__, event) => event.payload,
            }),
            target: states.connect,
          },
          [events.failure]: {
            actions: assign({
              error: (__, event) => _.toString(event.error),
            }),
            target: states.failure,
          },
        },
      },
      [states.connect]: {
        invoke: {
          src: (context, event) => attemptToConnect({ context, event }),
          onDone: {
            actions: assign({
              data: (context, event) => event.data,
            }),
            target: states.success,
          },
          onError: {
            actions: assign({
              error: (context, event) => _.toString(_.get(event, "data.message")),
            }),
            target: states.failure,
          },
        },
      },
      [states.success]: {
        entry: [actions.approve],
        on: {
          [events.reset]: states.idle,
        },
      },
      [states.failure]: {
        on: {
          "": states.idle,
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

export default {
  machine,
  states,
  actions,
  events,
};
