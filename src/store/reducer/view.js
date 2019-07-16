/**
 * Created by @VanSoftware on 2019-07-10.
 */
import Config from "../../config/Config";
import {combineReducers} from "redux";
import {Helper} from "../../config/Util";


const overlayInitial = {
    visible : 'init'
};

const overlay = (state = overlayInitial, action) => {
    switch (action.type) {
        case Config.REDUX_ACTION_VIEW_OVERLAY_TOGGLE:
            return {...state, visible: action.payload.visible};
        case Config.REDUX_ACTION_VIEW_OVERLAY_RESET:
            return {...state, visible: 'init'};
        case Config.REDUX_ACTION_VIEW_OVERLAY_OPEN:
            return {...state, visible: true};
        case Config.REDUX_ACTION_VIEW_OVERLAY_CLOSE:
            return {...state, visible: false};
        default:
            return state;
    }
};




const coverInitial = {
    visible : 'init'
};

const cover = (state = coverInitial, action) => {
    switch (action.type) {
        case Config.REDUX_ACTION_VIEW_COVER_TOGGLE:
            return {...state, visible: !Helper.isEmpty(action.payload.visible) ? action.payload.visible :  !(state.visible)};
        case Config.REDUX_ACTION_VIEW_COVER_RESET:
            return {...state, visible: 'init'};
        case Config.REDUX_ACTION_VIEW_COVER_OPEN:
            return {...state, visible: true};
        case Config.REDUX_ACTION_VIEW_COVER_CLOSE:
            return {...state, visible: false};
        default:
            return state;
    }
};



const common = (state = {}, action ) => {
    switch (action.type) {
        case Config.REDUX_ACTION_VIEW_COMMON_DOCUMENT_BACKGROUND_SCROLL_ENABLE : {
            let e = (document.scrollingElement || document.documentElement);
            if (!Helper.isEmpty(e)) e.style.overflow = "auto";
            break;
        }
        case Config.REDUX_ACTION_VIEW_COMMON_DOCUMENT_BACKGROUND_SCROLL_DISABLE: {
            let e = (document.scrollingElement || document.documentElement);
            if (!Helper.isEmpty(e)) e.style.overflow = "hidden";
            break;
        }
        default: break;
    }

    return state;
};

const navigatorInitial = {
    routeBack : Config.ROUTE_PAGE_DASHBOARD
};



const navigator = (state = navigatorInitial, action) => {
    switch (action.type) {
        case Config.REDUX_ACTION_VIEW_NAVIGATOR_SET_ROUTE_BACK : {
            return {...state, routeBack: (action.payload.hasOwnProperty("reset") && action.payload.reset ? navigatorInitial.routeBack :  action.payload.routeBack)};
        }
        default: break;
    }

    return state;
};




const reducerUI = combineReducers({overlay : overlay, cover : cover, common : common, navigator : navigator});

export default reducerUI;