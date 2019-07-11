/**
 * Created by @VanSoftware on 2019-07-11.
 */

import {Helper} from "../config/Util";

class NetworkIconModel{
    get AID() {
        return this._AID;
    }

    set AID(value) {
        this._AID = value;
    }

    get source() {
        return this._source;
    }

    set source(value) {
        this._source = value;
    }


    static PARAM_AID = "AID";
    static PARAM_SOURCE = "source";


    constructor(object){

        this._AID = Helper.getValue(NetworkIconModel.PARAM_AID, object);
        this._source = Helper.getValue(NetworkIconModel.PARAM_SOURCE, object);
    }
}


export default NetworkIconModel;