import _ from "lodash";
import { Machine, assign } from "xstate";

const states = {
  idle: "idle",
  request: "request",
  success: "success",
  failure: "failure",
  end: "end",
};

const events = {
  request: "request",
  reset: "reset",
  end: "end",
};

/** Only the named actions coming from the prop chain */
const actions = {
  approve: "approve",
};

const initialContext = {
  resource: null, // Required at declaration
  request: null, // Required at declaration
  isFetched: false,
  isLoading: false,
  data: null,
  list: [],
  error: null,
  limit: null,
  offset: null,
};

async function attemptToRequest({ context, event }) {
  if (_.has(context, "request") && _.isFunction(context.request)) return context.request(event.payload);
  throw new Error("Missing request.");
}

const machine = Machine({
  id: "listDataMachine",
  initial: "idle",
  context: initialContext,
  states: {
    [states.idle]: {
      on: {
        [events.request]: states.request,
      },
    },
    [states.request]: {
      entry: assign({
        isFetched: true,
        isLoading: true,
      }),
      invoke: {
        src: (context, event) => attemptToRequest({ context, event }),
        onDone: {
          actions: assign({
            data: (context, event) => event.data,
            list: (context, event) => [
              ..._.toArray(_.get(event, `data[${_.get(context, "resource")}]`)),
              ...(_.isNil(context.offset) ? [] : context.list || []),
            ],
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
      exit: assign({
        isLoading: false,
      }),
    },
    [states.success]: {
      entry: [actions.approve],
      on: {
        [events.request]: {
          actions: assign({
            error: null,
            offset: context => (_.isNil(context.offset) ? null : context.offset + (_.toNumber(context.limit) || 0)),
          }),
          target: states.failure,
        },
      },
    },
    [states.failure]: {},
  },
});

export default {
  machine,
  states,
  actions,
  events,
};
