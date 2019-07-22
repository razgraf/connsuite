import {Helper} from "../config/Util";
import PropTypes from "prop-types";

/**
 * Created by @VanSoftware on 2019-07-22.
 */


class SkillModel{
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


    static PARAM_AID = "AID";
    static PARAM_TITLE = "title";


    constructor(object) {

        this.AID = Helper.getValue(SkillModel.PARAM_AID, object);
        this.title = Helper.getValue(SkillModel.PARAM_TITLE, object);
    }



    static clone(item){
        return new SkillModel(item.toObject())
    }
    clone(){
        return new SkillModel(this.toObject());
    }


    toObject(){
        return {
            AID : this.AID,
            title : this.title
        }
    }


    static propTypes = {
        AID : PropTypes.string,
        title : PropTypes.string,
    }

}

export default SkillModel;