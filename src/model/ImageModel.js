/**
 * Created by @VanSoftware on 2019-07-11.
 */

import {Helper} from "../config/Util";
import PropTypes from "prop-types";

class ImageModel{
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

    get name() {
        return this._name;
    }

    set name(value) {
        this._name = value;
    }


    static PARAM_AID = "AID";
    static PARAM_SOURCE = "source";
    static PARAM_FILE = "file";
    static PARAM_NAME = "name";


    constructor(object){

        this.AID = Helper.getValue(ImageModel.PARAM_AID, object);
        this.name = Helper.getValue(ImageModel.PARAM_NAME,object);
        this.source = Helper.getValue(ImageModel.PARAM_SOURCE, object);
        this.file = Helper.getValue(ImageModel.PARAM_FILE, object);
    }



    static propTypes = PropTypes.shape({
        AID : PropTypes.string,
        source : PropTypes.string,
        name : PropTypes.string,
        file : PropTypes.object,
    });


    static clone(icon){
        return new ImageModel(icon.toObject())
    }

    toObject(){
        return {
            AID : this.AID,
            source : this.source,
            name : this.name,
            file : this.file
        }
    }
}


export default ImageModel;