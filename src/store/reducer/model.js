/**
 * Created by @VanSoftware on 2019-07-10.
 */
import Config from "../../config/Config";
import {combineReducers} from "redux";
import NetworkModel from "../../model/NetworkModel";
import {UserModel} from "../../model/UserModel";
import {Helper} from "../../config/Util";


const coverInitial = {
    network : new NetworkModel({}),
};

const cover = (state = coverInitial, action) => {
    switch (action.type) {
        case Config.REDUX_ACTION_MODEL_COVER_NETWORK_CHOOSE:
            return {...state , network : action.payload.network};
        default:
            return state;
    }
};

/**
 *
 * @type {{self: UserModel, active: UserModel}}
 */
const userInitial = {
    self : new UserModel(Config.USER.self), //TODO
    active : new UserModel(null),
};

const user = (state = userInitial, action )=>{
    switch (action.type) {
        case Config.REDUX_ACTION_MODEL_USER_SET_SELF:
            if(!Helper.isEmpty(action.payload.reset) && action.payload.reset) return  {...state , self : new UserModel(null)};
            return  {...state , self : action.payload.self};
        case Config.REDUX_ACTION_MODEL_USER_SET_ACTIVE:
            if(!Helper.isEmpty(action.payload.reset) && action.payload.reset) return  {...state , active : new UserModel(null)};
            return {...state , active : action.payload.active};
        default:
            return state;
    }
};



const reducerModel = combineReducers({cover : cover, user : user});

export default reducerModel;