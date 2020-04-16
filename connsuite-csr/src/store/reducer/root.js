/**
 * Created by @VanSoftware on 2019-07-10.
 */


import {combineReducers} from "redux";
import reducerView from "./view";
import reducerModel from "./model";
import reducerController from "./controller";



const rootReducer =  combineReducers({
    model : reducerModel,
    view : reducerView,
    controller : reducerController,
    });


export default rootReducer;