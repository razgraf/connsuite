import _ from "lodash";
import { Machine, assign } from "xstate";
import { ArticleRequest } from "../../requests";
import guards from "./guards";

const states = {
  idle: "idle",
  retrieve: "retrieve",
  body: "body",
  apply: "apply",
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
  bind: "bind",
};

const initialContext = {
  data: null,
  error: null,
};

/** {auth, articleId} =  event.payload */
async function attemptToRetrieve({ context }) {
  return ArticleRequest.get(context);
}

/** {auth, articleId, article} =  event.payload */
async function attemptToEdit({ event }) {
  const { payload } = event;
  if (!_.isNil(payload, "article.content")) payload.article.content = JSON.stringify(payload.article.content);
  if (!_.isNil(payload, "article.skills")) payload.article.skills = JSON.stringify(payload.article.skills);
  if (!_.isNil(payload, "article.categories")) payload.article.categories = JSON.stringify(payload.article.categories);
  return ArticleRequest.edit(payload);
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
    id: "editArticleMachine",
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
            target: states.body,
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
      [states.body]: {
        on: {
          [events.reset]: RESET,
          [events.forward]: [
            {
              cond: "isInternalBodyAcceptableEdit",
              target: states.apply,
            },
            {
              cond: "isExternalBodyAcceptableEdit",
              target: states.apply,
            },
            /** All article type and content guards failed */
            { ...INVALIDATE },
          ],
        },
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
