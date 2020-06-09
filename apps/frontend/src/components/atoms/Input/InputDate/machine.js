import { Machine } from "xstate";

export default Machine({
  id: "datePicker",
  initial: "idle",
  states: {
    idle: {
      on: {
        COLLAPSE: "collapsed",
      },
    },
    collapsed: {
      on: {
        IDLE: "idle",
        MONTH_IDLE: "collapsed.idle",
        MONTH_COLLAPSE: "collapsed.collapsed",
      },
      initial: "idle",
      states: {
        idle: {
          on: {
            MONTH_COLLAPSE: "collapsed",
          },
        },
        collapsed: {
          on: {
            MONTH_IDLE: "idle",
          },
        },
      },
    },
  },
});
