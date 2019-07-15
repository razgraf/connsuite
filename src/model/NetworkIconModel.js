/**
 * Created by @VanSoftware on 2019-07-11.
 */

import {Helper} from "../config/Util";
import PropTypes from "prop-types";

class NetworkIconModel{
    get file() {
        return this._file;
    }

    set file(value) {
        this._file = value;
    }
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
    static PARAM_FILE = "file";


    constructor(object){

        this.AID = Helper.getValue(NetworkIconModel.PARAM_AID, object);
        this.source = Helper.getValue(NetworkIconModel.PARAM_SOURCE, object);
        this.file = Helper.getValue(NetworkIconModel.PARAM_FILE, object);
    }



    static propTypes = PropTypes.shape({
        AID : PropTypes.string,
        source : PropTypes.string,
        file : PropTypes.object
    });


    static clone(icon){
        return new NetworkIconModel(icon.toObject())
    }

    toObject(){
        return {
            AID : this.AID,
            source : this.source,
            file : this.file
        }
    }
}


export default NetworkIconModel;