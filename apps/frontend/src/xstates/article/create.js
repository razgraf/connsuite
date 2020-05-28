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
  const { payload } = event;
  if (!_.isNil(payload, "article.skills")) payload.article.skills = JSON.stringify(payload.article.skills);
  if (!_.isNil(payload, "article.categories")) payload.article.categories = JSON.stringify(payload.article.categories);
  return ArticleRequest.create(event.payload);
}

const RESET = {
  target: states.body,
  actions: assign(() => initialContext),
};

const INVALIDATE = {
  target: states.body,
  actions: assign({
    error: () => "Fill in all the available fields before publishing.",
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
          "": states.body,
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
