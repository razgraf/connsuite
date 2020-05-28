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
  1: state => ({
    ...state,
    resource: {
      ...state.resource,
      skills: {
        list: [],
        isLoading: false,
        isFetched: false,
      },
      categories: {
        list: [],
        isLoading: false,
        isFetched: false,
      },
    },
  }),
};

export default migrations;
