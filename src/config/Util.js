/**
 * Created by @VanSoftware on 2019-07-04.
 */

class Helper {


    static isEmpty = (value) => {
        try {
            if (value === undefined || typeof value === 'undefined' || value === null) return true; //first check if value is defined and !null

            //case : object
            if (typeof value === 'object') {
                for(let key in value) if(key !== undefined) return false; //check if the object has any values
            }
            //case : array
            else if ( value.constructor === Array) {
                if (value.length !== 0) return false;  //check if the array has positive length
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
     * @param {Boolean} shouldNullify
     * @returns {*|String|int}
     */
    static getValue(object, key, shouldNullify = false){
        if(Helper.isDataSetInObject(key, object)) {
            let value = object[key];
            if(shouldNullify) object[key]  = null;
            return value;
        }
        return null;
    };

    /**
     *
     * @param {Object} object
     * @param {String|int}key
     * @param {Boolean} shouldNullify
     * @returns {*|Object}
     */

    static getObject(object, key,shouldNullify = false){
        if(Helper.isObjectSetInObject(key,object)){
            let value = object[key];
            if(shouldNullify) object[key]  = null;
            return value;
        }
        return null;
    };

    /**
     *
     * @param {Object} object
     * @param {String|int}key
     * @param {Boolean} shouldNullify
     * @returns {*|Array}
     */
    static getArray(object, key,shouldNullify = false){
        if(this.isArraySetInObject(key,object)){
            let value = object[key];
            if(shouldNullify) object[key]  = null;
            return value;
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