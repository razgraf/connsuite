import { PURGE, REHYDRATE } from "redux-persist";
import { redux } from "../../constants";

export const initialResource = {
  networks: {
    list: [],
    isLoading: false,
    isFetched: false,
  },
};

const resource = (state = initialResource, { type, payload }) => {
  switch (type) {
    case redux.RESOURCE_EXTERNAL_NETWORKS_SET: {
      return { ...state, networks: { ...state.networks, ...payload } };
    }
    case redux.RESOURCE_EXTERNAL_NETWORKS_SET_LIST: {
      return { ...state, networks: { ...state.networks, list: payload.list } };
    }
    case redux.RESOURCE_EXTERNAL_NETWORKS_SET_IS_LOADING: {
      return { ...state, networks: { ...state.networks, isLoading: payload.isLoading } };
    }
    case redux.RESOURCE_EXTERNAL_NETWORKS_SET_IS_FETCHED: {
      return { ...state, networks: { ...state.networks, isFetched: payload.isFetched } };
    }
    case REHYDRATE:
      return initialResource;
    case PURGE:
      return initialResource;
    default:
      return state;
  }
};

const resourceReducer = resource;
export default resourceReducer;
