import Config from "../../config/Config";

/**
 * Created by @VanSoftware on 2019-07-10.
 */


const cover =
    store => {
        return next => {
            return action => {
                switch (action.type) {
                    case Config.REDUX_ACTION_CONTROLLER_COVER_CLOSE: {
                        store.dispatch({type: Config.REDUX_ACTION_VIEW_COVER_CLOSE});
                        setTimeout(()=>{store.dispatch({type: Config.REDUX_ACTION_VIEW_COVER_RESET});},350);
                        break;
                    }
                    case Config.REDUX_ACTION_CONTROLLER_COVER_NETWORK_CHOOSE: {
                        store.dispatch({
                            type: Config.REDUX_ACTION_MODEL_COVER_NETWORK_CHOOSE,
                            payload: action.payload
                        });
                        store.dispatch({
                            type: Config.REDUX_ACTION_VIEW_COVER_OPEN
                        });
                        break;
                    }
                    default: break;
                }
                return next(action);
            }
        }
    };


export default [cover];
