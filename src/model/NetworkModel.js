/**
 * Created by @VanSoftware on 2019-07-11.
 */


import {Helper} from "../config/Util";
import NetworkIconModel from "./NetworkIconModel";
import PropTypes from "prop-types";

class NetworkModel{
    get URL() {
        return this._URL;
    }

    set URL(value) {
        this._URL = value;
    }
    get AID() {
        return this._AID;
    }

    set AID(value) {
        this._AID = value;
    }

    get title() {
        return this._title;
    }

    set title(value) {
        this._title = value;
    }

    get username() {
        return this._username;
    }

    set username(value) {
        this._username = value;
    }

    get icon() {
        return this._icon;
    }

    set icon(value) {
        this._icon = value;
    }

    get thumbnail() {
        return this._thumbnail;
    }

    set thumbnail(value) {
        this._thumbnail = value;
    }
    get identifier() {
        return this._identifier;
    }

    set identifier(value) {
        this._identifier = value;
    }


    static PARAM_AID = "AID";
    static PARAM_TITLE = "title";
    static PARAM_USERNAME = "username";
    static PARAM_ICON = "icon";
    static PARAM_THUMBNAIL = "thumbnail";
    static PARAM_IDENTIFIER = "identifier";
    static PARAM_URL = "URL";

    constructor(object){

        this.AID = Helper.getValue(NetworkModel.PARAM_AID, object);
        this.title = Helper.getValue(NetworkModel.PARAM_TITLE, object);
        this.username = Helper.getValue(NetworkModel.PARAM_USERNAME, object);
        this.icon = new NetworkIconModel(Helper.getValue(NetworkModel.PARAM_ICON, object));
        this.thumbnail = new NetworkIconModel(Helper.getValue(NetworkModel.PARAM_THUMBNAIL, object));
        this.identifier =  Helper.getValue(NetworkModel.PARAM_IDENTIFIER, object);

        this.URL = Helper.getValue(NetworkModel.PARAM_URL, object);

        if(Helper.isEmpty(this.identifier) && !Helper.isEmpty(this.title)) this.identifier = this.title.toLowerCase();

    }


    /**
     *
     * @param {NetworkModel} network
     */
    static clone(network){
        return new NetworkModel(network.toObject());
    }



    static propTypes =  PropTypes.shape({
            AID : PropTypes.string,
            title : PropTypes.string,
            username : PropTypes.string,
            URL : PropTypes.string,
            identifier : PropTypes.string,
            icon : NetworkIconModel.propTypes,
            thumbnail : NetworkIconModel.propTypes,
    });

    static defaultProps = {
            AID: null,
            title: null,
            username: null,
            URL: null,
            identifier: null,
            icon: {
                AID: null,
                source: null
            },
            thumbnail: {
                AID: null,
                source: null
            }
    };


    static isMatching(network1, network2){
        return (!Helper.isEmpty(network1) &&
            !Helper.isEmpty(network2) &&
            !Helper.isEmpty(network1.AID) &&
            !Helper.isEmpty(network2.AID) &&
            network1.AID !== network2.AID)
    }



    toObject(){
        return {
            AID : this.AID,
            title : this.title,
            username : this.username,
            icon : this.icon.toObject(),
            thumbnail : this.icon.toObject(),
            identifier :  this.identifier,
            URL : this.URL,
        }
    }


}

export default NetworkModel;