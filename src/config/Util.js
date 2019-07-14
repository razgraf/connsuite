/**
 * Created by @VanSoftware on 2019-07-04.
 */
import cx from 'classnames';

class Helper {


    /**
     * The purpose of this functionality is to extend the styling received from the
     * default CSS module with a dynamic styling. Due to the dynamic generation of
     * class names, we wouldn't have been able to do this with pure css.
     * This way, when we now expect dynamic styling, we test it and merge it using
     * cx() from the classnames package
     *
     *
     * @param {Object} primary - the primary style module
     * @param {Object} dynamic - the dynamic style module, the overrider
     * @param {string} className - the primary className
     * @param {string} dynamicClassName - the dynamic className, the overrider
     * @return {*}
     */

    static dynamicClass ( primary, dynamic, className, dynamicClassName = className){
        const style = primary[className];
        if(Helper.isEmpty(dynamic) || Helper.isEmpty(dynamic[dynamicClassName])) return style;
        return cx(style, dynamic[dynamicClassName]);
    }



    /**
     *
     *
     *
     *
     *  DATA INTEGRITY
     *
     *
     */


    static isEmpty = (value) => {
        try {
            if (value === undefined || typeof value === 'undefined' || value === null) return true; //first isValid if value is defined and !null

            //case : object
            if (typeof value === 'object') {

                if (value !== "" && value !== {} && value !== "{}") return false;
            }
            //case : array
            else if ( value.constructor === Array) {
                if (value.length !== 0) return false;  //isValid if the array has positive length
            }
            //case : string/number
            else {
                if (value === "0" || value === 0 || value === false || value === true) return false;
                return (!value || /^\s*$/.test(String(value)));
            }
        }
        catch (err){console.error(err);}

        return true;
    };

    static isFunction = (value) => {
        if(Helper.isEmpty(value)) return false;
        return typeof value === "function";
    };

    /**
     *
     * @param {Object} object
     * @param {String|int}key
     * @returns {*|String|int}
     */
    static getValue(key, object){
        if(Helper.isDataSetInObject(key, object)) {
            return object[key];
        }
        return null;
    };

    /**
     *
     * @param {Object} object
     * @param {String|int}key
     * @returns {*|Object}
     */

    static getObject(key, object){
        if(Helper.isObjectSetInObject(key,object)){
            return object[key];
        }
        return null;
    };

    /**
     *
     * @param {Object} object
     * @param {String|int}key
     * @returns {*|Array}
     */
    static getArray(key, object){
        if(this.isArraySetInObject(key,object)){
            return object[key];
        }
        return null;
    };

    /**
     *
     * @param array
     * @param {Function} creator - will be a function that will create an object from the variables (e.g. return new Person(someNotParsedObject))
     * @returns {Array}
     */

    static parseArrayElementWithClass(array, creator = function(element, position){return element;}){
        if(array === null || array.length === 0) return [];
        let result = [];
        for(let i = 0; i < array.length; i++){
            result.push(creator(array[i],i));
        }
        return result;
    };


    static isDataSetInObject(key, object){
        if(object === null || object === undefined || object.length === 0) return false;
        if(!object.hasOwnProperty(key)) return false;
        return !Helper.isEmpty(object[key]);
    }
    static isObjectSetInObject(key, object) {
        if(object === null || object === undefined || object.length === 0) return false;
        if(!object.hasOwnProperty(key)) return false;
        return object[key] !== null;
    }
    static isArraySetInObject(key, object) {
        if(object === null || object === undefined || object.length === 0) return false;
        if(!object.hasOwnProperty(key)) return false;
        return object[key] !== null && object[key].length > 0;
    }
    static sanitize(value, fallback = ""){
        return Helper.isEmpty(value) ? fallback : value;
    }


}

export {
    Helper
}