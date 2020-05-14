import _ from "lodash";
import { Machine, assign } from "xstate";
import { NetworkRequest } from "../../requests";
import guards from "./guards";

const states = {
  idle: "idle",
  choose: "choose",
  credentials: "credentials",
  live: "live",
  create: "create",
  success: "success",
  failure: "failure",
};

const events = {
  initialize: "initialize",
  forward: "forward",
  backward: "backward",
  reset: "reset",
  success: "success",
  failure: "failure",
};

/** Only the named actions coming from the prop chain */
const actions = {
  approve: "approve",
};

const initialContext = {
  step: 1,
  data: null,
  error: null,
};

async function attemptToCreate({ context }) {
  /**
   * All guards should be passed
   */
  console.log("SUCCESS");
  return {
    data: "GG",
  };
  // return NetworkRequest.create(context);
}

const RESET = {
  target: states.idle,
  actions: assign(() => initialContext),
};

const INVALIDATE = {
  target: states.idle,
  actions: assign({
    error: () => "Invalid network configuration",
  }),
};

const machine = Machine(
  {
    id: "createNetworkMachine",
    initial: "idle",
    context: { ...initialContext, type: "CREATE" },
    states: {
      [states.idle]: {
        on: {
          "": states.choose,
        },
      },
      [states.choose]: {
        entry: assign({ step: 1 }),
        on: {
          [events.forward]: [
            {
              cond: "isInternalChooseAcceptable",
              target: states.credentials,
            },
            {
              cond: "isExternalChooseAcceptable",
              target: states.credentials,
            },
            /** All network type and content guards failed */
            { ...INVALIDATE },
          ],
        },
        exit: assign({ error: null }),
      },
      [states.credentials]: {
        entry: assign({ step: 2 }),
        on: {
          [events.reset]: RESET,
          [events.backward]: states.choose,
          [events.forward]: [
            {
              cond: "isInternalCredentialsAcceptable",
              target: states.live,
            },
            {
              cond: "isExternalCredentialsAcceptable",
              target: states.live,
            },
            /** All network type and content guards failed */
            { ...INVALIDATE },
          ],
        },
        exit: assign({ error: null }),
      },
      [states.live]: {
        entry: assign({ step: 3, error: null }),
        on: {
          [events.reset]: RESET,
          [events.backward]: states.credentials,
          [events.forward]: [
            {
              cond: "isLiveAcceptable",
              target: states.create,
            },
            /** All content guards failed */
            { ...INVALIDATE },
          ],
        },
        exit: assign({ error: null }),
      },
      [states.create]: {
        invoke: {
          src: (context, event) => attemptToCreate({ context, event }),
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
          "": states.idle,
        },
      },
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
