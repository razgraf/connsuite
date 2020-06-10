import _ from "lodash";
import { Machine, assign } from "xstate";
import { NetworkRequest } from "../../requests";
import guards from "./guards";

const states = {
  idle: "idle",
  retrieve: "retrieve",
  modify: "modify",
  apply: "apply",
  success: "success",
  failure: "failure",
};

const events = {
  initialize: "initialize",
  forward: "forward",
  reset: "reset",
  forbidden: "forbidden",
};

/** Only the named actions coming from the prop chain */
const actions = {
  approve: "approve",
  bind: "bind",
};

const initialContext = {
  data: null,
  error: null,
};

/** {auth, networkId} =  event.payload */
async function attemptToRetrieve({ context }) {
  return NetworkRequest.get(context);
}

/** {auth, networkId, network} =  event.payload */
async function attemptToEdit({ event }) {
  return NetworkRequest.edit(event.payload);
}

const RESET = {
  target: states.modify,
  actions: assign(() => initialContext),
};

const machine = Machine(
  {
    id: "editNetworkMachine",
    initial: "idle",
    context: { ...initialContext },
    states: {
      [states.idle]: {
        on: {
          "": states.retrieve,
        },
      },
      [states.retrieve]: {
        invoke: {
          src: (context, event) => attemptToRetrieve({ context, event }),
          onDone: {
            actions: assign({
              data: (context, event) => event.data,
            }),
            target: states.modify,
          },
          onError: {
            actions: assign({
              error: (context, event) => _.toString(_.get(event, "data.message")),
            }),
            target: states.forbidden,
          },
        },
        exit: [actions.bind],
      },
      [states.modify]: {
        on: {
          [events.reset]: RESET,
          [events.forward]: states.apply,
        },
        exit: assign({ error: null }),
      },
      [states.apply]: {
        invoke: {
          src: (context, event) => attemptToEdit({ context, event }),
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
          [events.reset]: RESET,
        },
      },
      [states.failure]: {
        on: {
          "": states.modify,
        },
      },
      [states.forbidden]: {},
    },
  },
  {
    guards,
  },
);

export default {
  machine,
  states,
  actions,
  events,
  guards,
};
