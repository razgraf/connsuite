import _ from "lodash";
import { Machine, assign } from "xstate";
import { ArticleRequest } from "../../requests";
import guards from "./guards";

const states = {
  idle: "idle",
  picker: "picker",
  body: "body",
  create: "create",
  success: "success",
  failure: "failure",
};

const events = {
  initialize: "initialize",
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

async function attemptToCreate({ event }) {
  console.log(event.payload);
  return true;
  // return ArticleRequest.create(event.payload);
}

const RESET = {
  target: states.idle,
  actions: assign(() => initialContext),
};

const INVALIDATE = {
  target: states.idle,
  actions: assign({
    error: () => "Invalid article configuration",
  }),
};

const machine = Machine(
  {
    id: "createArticleMachine",
    initial: "idle",
    context: { ...initialContext },
    states: {
      [states.idle]: {
        on: {
          "": states.picker,
        },
      },
      [states.picker]: {
        on: {
          [events.forward]: states.body,
        },
      },
      [states.body]: {
        entry: assign({ error: null }),
        on: {
          [events.reset]: RESET,
          [events.backward]: states.picker,
          [events.forward]: [
            {
              cond: "isInternalBodyAcceptable",
              target: states.create,
            },
            {
              cond: "isExternalBodyAcceptable",
              target: states.create,
            },
            /** All network type and content guards failed */
            { ...INVALIDATE },
          ],
        },
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
            target: states.body,
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
