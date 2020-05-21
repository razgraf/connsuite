import { initialPortfolio } from "../reducers/data";

const migrations = {
  0: store => {
    return { ...store };
  },
  1: store => {
    return {
      ...store,
      data: {
        ...store.data,
        portfolio: initialPortfolio,
      },
    };
  },
};

export default migrations;
