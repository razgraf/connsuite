import { PURGE, REHYDRATE } from "redux-persist";
import { redux } from "../../constants";

export const initialPortfolio = {
  articles: {
    list: [],
    isLoading: false,
    isFetched: false,
    limit: null,
    offset: null,
  },
  networks: {
    list: [],
    isLoading: false,
    isFetched: false,
    limit: null,
    offset: null,
  },
};

const portfolio = (state = initialPortfolio, { type, payload }) => {
  switch (type) {
    case redux.NETWORKS_SET: {
      return {
        ...state,
        networks: {
          ...state.networks,
          ...payload,
          isLoading: payload.isLoading,
          isFetched: payload.isFetched,
        },
      };
    }
    case redux.NETWORKS_SET_LIST: {
      return { ...state, networks: { ...state.networks, list: payload.list } };
    }
    case redux.NETWORKS_CLEAR_LIST: {
      return { ...state, networks: { ...state.networks, list: [] } };
    }
    case redux.NETWORKS_SET_IS_LOADING: {
      return {
        ...state,
        networks: { ...state.networks, isLoading: payload.isLoading },
      };
    }
    case redux.NETWORKS_SET_IS_FETCHED: {
      return {
        ...state,
        networks: { ...state.networks, isFetched: payload.isFetched },
      };
    }
    case redux.NETWORKS_PUSH_LIST: {
      return { ...state, networks: { ...state.networks, list: [...state.networks.list, ...payload.list] } };
    }
    case redux.ARTICLES_SET: {
      return {
        ...state,
        articles: {
          ...state.articles,
          list: payload.list,
          isLoading: payload.isLoading,
          isFetched: payload.isFetched,
        },
      };
    }
    case redux.ARTICLES_SET_LIST: {
      return { ...state, articles: { ...state.articles, list: payload.list } };
    }
    case redux.ARTICLES_CLEAR_LIST: {
      return { ...state, articles: { ...state.articles, list: [] } };
    }
    case redux.ARTICLES_SET_IS_LOADING: {
      return {
        ...state,
        articles: { ...state.articles, isLoading: payload.isLoading },
      };
    }
    case redux.ARTICLES_SET_IS_FETCHED: {
      return {
        ...state,
        articles: { ...state.articles, isFetched: payload.isFetched },
      };
    }
    case redux.ARTICLES_PUSH_LIST: {
      return { ...state, articles: { ...state.articles, list: [...state.articles.list, ...payload.list] } };
    }
    // case REHYDRATE:
    //   return initialPortfolio;
    case PURGE:
      return initialPortfolio;
    default:
      return state;
  }
};

const portfolioReducer = portfolio;
export default portfolioReducer;
