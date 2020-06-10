import _ from "lodash";
import { Machine, assign } from "xstate";
import { UserRequest } from "../../requests";
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

/** {auth, userId} =  event.payload */
async function attemptToRetrieve({ context }) {
  return UserRequest.profile(context);
}

/** {auth, profile} =  event.payload */
async function attemptToEdit({ event }) {
  console.log(event);
  return UserRequest.edit(event.payload);
}

const RESET = {
  target: states.body,
  actions: assign(() => initialContext),
};

const INVALIDATE = {
  target: states.body,
  actions: assign({
    error: () => "Fill in all the available fields before updating.",
  }),
};

const machine = Machine(
  {
    id: "editProfileMachine",
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
              cond: "isProfileAcceptable",
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
