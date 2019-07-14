/**
 * Created by @VanSoftware on 2019-07-10.
 */
import Config from "../../config/Config";
import {combineReducers} from "redux";
import NetworkModel from "../../model/NetworkModel";



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






const reducerModel = combineReducers({cover : cover});

export default reducerModel;