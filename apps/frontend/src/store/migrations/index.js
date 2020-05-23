const migrations = {
  0: state => ({
    ...state,
    view: {
      ...state.view,
      modal: {
        list: [],
      },
    },
  }),
};

export default migrations;
