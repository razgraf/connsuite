import {Helper} from "../../../config/Util";
import PropTypes from "prop-types";
import FieldLabel from "./FieldLabel/FieldLabel";
import styles from "./Base/BaseField.module.scss";

class BaseFieldModel{
    get callback() {
        return this._callback;
    }

    set callback(value) {
        this._callback = value;
    }
    get danger() {
        return this._danger;
    }

    set danger(value) {
        this._danger = value;
    }
    get ID() {
        return this._ID;
    }

    set ID(value) {
        this._ID = value;
    }

    get element() {
        return this._element;
    }

    set element(value) {
        this._element = value;
    }

    get label() {
        return this._label;
    }

    set label(value) {
        this._label = value;
    }

    get value() {
        return this._value;
    }

    set value(value) {
        this._value = value;
    }

    get placeholder() {
        return this._placeholder;
    }

    set placeholder(value) {
        this._placeholder = value;
    }

    get length() {
        return this._length;
    }

    set length(value) {
        this._length = value;
    }

    get style() {
        return this._style;
    }

    set style(value) {
        this._style = value;
    }


    /**
     *
     * @param {Object} object
     * @param {string} object.ID
     *
     * @param {Object} object.element
     * @param {Object} [object.element.parent]
     * @param {Object} object.element.container
     * @param {Object} object.element.field]
     * @param {Object} [object.element.label]
     *
     * @param {boolean} object.optional
     * @param {object} object.label
     * @param {string|number|null} object.value
     * @param {string} object.placeholder
     * @param {[number, number]} [object.length] - Array of shape [minLength, maxLength]
     * @param {Object} [object.style] - will assign classNames automatically
     * @param {Boolean} object.danger
     * @param {Object} [object.callback]
     * @param {Function} object.callback.onClick
     * @param {Function} object.callback.onChange
     * @param {Function} object.callback.onInitialized
     */
    constructor(object){

        this.ID = Helper.getValue("ID",object);
        this.element = Helper.getObject("element",object);

        this.label = Helper.getObject("label",object);
        this.value =  Helper.getObject("value",object);
        this.placeholder = Helper.getObject("placeholder",object);

        this.length = Helper.getArray("length", object); //[null,x], [x,y], [x, null]
        this.style = Helper.getArray("style",object);

        this.danger = false;
        this.optional = false;
        this.warnToggle = ()=>{};
        this.warnOnBlur = false;


        this.callback = {
            onClick : Helper.sanitize(Helper.getValue("onClick", Helper.getValue("callback", object) ), ()=> {}),
            onChange : Helper.sanitize(Helper.getValue("onChange", Helper.getValue("callback", object) ), ()=> {}),
            onInitialized: Helper.sanitize(Helper.getValue("onInitialized", Helper.getValue("callback", object) ), ()=> {}),
        };

    }


    static propTypes = {

        type : PropTypes.string,
        data : {
            ID : PropTypes.string.isRequired,
            value : PropTypes.any,
            placeholder : PropTypes.any,
            length : PropTypes.arrayOf(PropTypes.number),

            label : PropTypes.shape(FieldLabel.propTypes).isRequired,
            warn : PropTypes.shape({

                text : PropTypes.string,
                onBlur : PropTypes.bool
            }),

            optional :  PropTypes.bool,
        },

        action :{
            callback : PropTypes.shape({
                onClick : PropTypes.func,
                onReady  :PropTypes.func,
                onChange : PropTypes.func,
                onInitialized : PropTypes.func,
            }),
            onChange : PropTypes.func,
            onUpdateWarn : PropTypes.func,
            doDefineScope :  PropTypes.func,
        },


    };

    static defaultProps = {
        data : {
            label : {
                label : "Label",
                force : "bottom",
                styles : styles
            },
            warn : {
                onBlur : false,
            },
            optional :  false,
        },
        action : {
            onChange : () => {},

            callback : {
                onClick : ()=>{},
                onReady : ()=>{},
                onChange : (scope)=>{},
                onInitialized : ()=>{}
            },
        }

    };

}


export default BaseFieldModel;