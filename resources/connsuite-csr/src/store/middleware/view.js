import Config from "../../config/Config";


/**
 * Created by @VanSoftware on 2019-07-10.
 */


const overlay =
    store => {
        return next => {
            return action => {
                switch (action.type) {
                    case Config.REDUX_ACTION_VIEW_OVERLAY_OPEN:
                        store.dispatch({type : Config.REDUX_ACTION_VIEW_COMMON_DOCUMENT_BACKGROUND_SCROLL_DISABLE});
                        break;
                    case Config.REDUX_ACTION_VIEW_OVERLAY_CLOSE:
                        store.dispatch({type : Config.REDUX_ACTION_VIEW_COMMON_DOCUMENT_BACKGROUND_SCROLL_ENABLE});
                        break;
                    default: break;
                }

                return next(action);
            }
        }
    };

const cover =
    store => {
        return next => {
            return action => {
                switch (action.type) {
                    case Config.REDUX_ACTION_VIEW_COVER_OPEN:
                        store.dispatch({type : Config.REDUX_ACTION_VIEW_COMMON_DOCUMENT_BACKGROUND_SCROLL_DISABLE});
                        break;
                    case Config.REDUX_ACTION_VIEW_COVER_CLOSE:
                        store.dispatch({type : Config.REDUX_ACTION_VIEW_COMMON_DOCUMENT_BACKGROUND_SCROLL_ENABLE});
                        break;
                    default: break;
                }
                return next(action);
            }
        }
    };


const navigator =
    store => {
        return next => {
            return action => {
                return next(action);
            }
        }
    };



export default [overlay, cover, navigator];
