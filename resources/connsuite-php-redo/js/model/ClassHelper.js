/**
 * Created by @VanSoftware on 10/06/2018.
 */

class ClassHelper{
    constructor(){}

    isEmpty(str) {
        if (str === "0" || str === 0 || str === false || str === true) return false;
        return (!str || /^\s*$/.test(str));
    }

    isDataSetInObject(key, object){
    if(object === null || object === undefined || object.length === 0) return false;
    if(!object.hasOwnProperty(key)) return false;
    return !this.isEmpty(object[key]);
}

    isObjectSetInObject(key, object) {
    if(object === null || object === undefined || object.length === 0) return false;
    if(!object.hasOwnProperty(key)) return false;
    return object[key] !== null;
}

    isArraySetInObject(key, object) {
    if(object === null || object === undefined || object.length === 0) return false;
    if(!object.hasOwnProperty(key)) return false;
    return object[key] !== null && object[key].length > 0;

}
}

/**
 *
 * @param {Object} object
 * @param {String|int}key
 * @param {Boolean} shouldNullify
 * @returns {*|String|int}
 */
ClassHelper.prototype.getValue = function (object, key, shouldNullify = false){
    if(this.isDataSetInObject(key, object)) {
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

ClassHelper.prototype.getObject = function(object, key,shouldNullify = false){
    if(this.isObjectSetInObject(key,object)){
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
ClassHelper.prototype.getArray = function(object, key,shouldNullify = false){
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
ClassHelper.prototype.parseArrayElementWithClass = function(array, creator = function(element, position){return element;}){
  if(array === null || array.length === 0) return [];
  let result = [];
  for(let i = 0; i < array.length; i++){
        result.push(creator(array[i],i));
  }
  return result;
};