import _ from "lodash";
import { Machine, assign } from "xstate";
import { NetworkRequest } from "../../requests";
import guards from "./guards";

const states = {
  idle: "idle",
  decide: "decide",
  apply: "apply",
  success: "success",
  failure: "failure",
};

const events = {
  forward: "forward",
  reset: "reset",
};

/** Only the named actions coming from the prop chain */
const actions = {
  approve: "approve",
};

const initialContext = {
  data: null,
  error: null,
};

/** {auth, networkId} =  event.payload */
async function attemptToRemove({ event }) {
  return NetworkRequest.remove(event.payload);
}

const RESET = {
  target: states.decide,
  actions: assign(() => initialContext),
};

const machine = Machine(
  {
    id: "removeNetworkMachine",
    initial: "idle",
    context: { ...initialContext },
    states: {
      [states.idle]: {
        on: {
          "": states.decide,
        },
      },
      [states.decide]: {
        on: {
          [events.reset]: RESET,
          [events.forward]: [
            {
              cond: "isNetworkIdProvided",
              target: states.apply,
            },
          ],
        },
        exit: assign({ error: null }),
      },
      [states.apply]: {
        invoke: {
          src: (context, event) => attemptToRemove({ context, event }),
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
      },
      [states.failure]: {},
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
