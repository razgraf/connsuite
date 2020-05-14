import _ from "lodash";
import { Machine, assign } from "xstate";
import { NetworkRequest } from "../../requests";
import { types } from "../../constants";

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
  pickType: "pickType",
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
  data: null,
  error: null,
  type: types.network.source.external,
};

async function attemptToCreate({ context }) {
  return NetworkRequest.create(context);
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
    context: initialContext,
    states: {
      [states.idle]: {
        on: {
          "": states.choose,
        },
      },
      [states.choose]: {
        on: {
          [events.pickType]: {
            actions: assign({
              type: (__, event) => event.type,
            }),
            target: states.choose,
          },
          [events.forward]: [
            {
              cond: ["isTypeInternal", "isTitleValid", "isIconValid"],
              target: states.credentials,
            },
            {
              cond: ["isTypeExternal", "isExternalIdValid"],
              target: states.credentials,
            },
            /** All type and content guards failed */
            { ...INVALIDATE },
          ],
        },
      },
      [states.credentials]: {
        on: {
          [events.reset]: RESET,
          [events.backward]: states.choose,
          [events.forward]: [
            {
              cond: ["isTypeInternal", "isUrlValid", "isUsernameAcceptable"],
              target: states.live,
            },
            {
              cond: ["isTypeExternal", "isUsernameValid"],
              target: states.live,
            },
            /** All type and content guards failed */
            { ...INVALIDATE },
          ],
        },
      },
      [states.live]: {
        on: {
          [events.reset]: RESET,
          [events.backward]: states.credentials,
          [events.forward]: [
            {
              cond: ["isDescriptionAcceptable"],
              target: states.create,
            },
            /** All content guards failed */
            { ...INVALIDATE },
          ],
        },
      },
      [states.create]: {
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
};
