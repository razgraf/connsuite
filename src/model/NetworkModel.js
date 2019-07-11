/**
 * Created by @VanSoftware on 2019-07-11.
 */


import {Helper} from "../config/Util";
import NetworkIconModel from "./NetworkIconModel";

class NetworkModel{


    static PARAM_AID = "AID";
    static PARAM_TITLE = "title";
    static PARAM_USERNAME = "username";
    static PARAM_ICON = "icon";
    static PARAM_THUMBNAIL = "thumbnail";

    constructor(object){

        this.AID = Helper.getValue(NetworkModel.PARAM_AID, object);
        this.title = Helper.getValue(NetworkModel.PARAM_TITLE, object);
        this.username = Helper.getValue(NetworkModel.PARAM_USERNAME, object);
        this.icon = new NetworkIconModel(Helper.getValue(NetworkModel.PARAM_ICON, object));
        this.thumbnail = new NetworkIconModel(Helper.getValue(NetworkModel.PARAM_THUMBNAIL, object));
    }
}

export default NetworkModel;