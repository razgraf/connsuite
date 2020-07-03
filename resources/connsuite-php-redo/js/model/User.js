/**
 * Created by @VanSoftware on 19/08/2018.
 */

const USER_KEY_ID = "ID";
const USER_KEY_AID = "AID";
const USER_KEY_USERNAME = "username";
const USER_KEY_FIRSTNAME = "firstName";
const USER_KEY_LASTNAME = "lastName";
const USER_KEY_NAME = "name";
const USER_KEY_FACEBOOK_ID = "facebook";
const USER_KEY_LINKEDIN_ID = "linkedinID";
const USER_KEY_TWITTER_ID = "twitterID";
const USER_KEY_EMAIL = "email";
const USER_KEY_PHONE = "phone";
const USER_KEY_VERSION = "version";
const USER_KEY_SHORT = "short";
const USER_KEY_DESCRIPTION = "description";
const USER_KEY_INSTANTIATED = "instantiated";

const USER_KEY_NETWORKS = "networks";
const USER_KEY_ARTICLES = "articles";
const USER_KEY_ALIASES = "aliases";


class User extends ClassHelper{
    get articles() {
        return this._articles;
    }

    set articles(value) {
        this._articles = value;
    }

    /**
     *
     * @returns {Array<Network>}
     */
    get networks() {
        return this._networks;
    }

    /**
     *
     * @param {Array<Network>} value
     */
    set networks(value) {
        this._networks = value;
    }
    /**
     *
     * @returns {Array<DangerItem>}
     */
    get dangers() {
        return this._dangers;
    }

    /**
     *
     * @param {Array<DangerItem>} value
     */
    set dangers(value) {
        this._dangers = value;
    }

    /**
     *
     * @returns {Array<Field>}
     */
    get fields() {
        return this._fields;
    }

    /**
     *
     * @param {Array<Field>} value
     */
    set fields(value) {
        this._fields = value;
    }

    /**
     *
     * @returns {Array<Input>}
     */
    get inputs() {
        return this._inputs;
    }

    /**
     *
     * @param {Array<Input>} value
     */
    set inputs(value) {
        this._inputs = value;
    }
    /**
     *
     * @returns {String}
     */
    get thumbnail() {
        return this._thumbnail;
    }
    /**
     *
     * @param {String} value
     */
    set thumbnail(value) {
        this._thumbnail = value;
    }
    /**
     *
     * @returns {String}
     */
    get profile() {
        return this._profile;
    }
    /**
     *
     * @param {String} value
     */
    set profile(value) {
        this._profile = value;
    }
    /**
     *
     * @returns {String}
     */
    get name() {
        return this._name;
    }
    /**
     *
     * @param {String} value
     */
    set name(value) {
        this._name = value;
    }

    get instantiated() {
        return this._instantiated;
    }

    set instantiated(value) {
        this._instantiated = value;
    }
    /**
     *
     * @returns {String}
     */
    get description() {
        return this._description;
    }

    /**
     *
     * @param {String} value
     */
    set description(value) {
        this._description = value;
    }
    /**
     *
     * @returns {String}
     */
    get short() {
        return this._short;
    }

    /**
     *
     * @param {String} value
     */
    set short(value) {
        this._short = value;
    }

    /**
     *
     * @returns {int}
     */
    get version() {
        return this._version;
    }

    /**
     *
     * @param {int} value
     */
    set version(value) {
        this._version = !isEmpty(value)? parseInt(value) : 0;
    }


    /**
     *
     * @returns {String}
     */
    get phone() {
        return this._phone;
    }

    /**
     *
     * @param {String} value
     */
    set phone(value) {
        this._phone = value;
    }

    /**
     *
     * @returns {String}
     */
    get email() {
        return this._email;
    }

    /**
     *
     * @param {String} value
     */
    set email(value) {
        this._email = value;
    }

    /**
     *
     * @returns {String}
     */
    get twitterID() {
        return this._twitterID;
    }

    /**
     *
     * @param {String} value
     */
    set twitterID(value) {
        this._twitterID = value;
    }

    /**
     *
     * @returns {String}
     */
    get linkedinID() {
        return this._linkedinID;
    }

    /**
     *
     * @param {String} value
     */
    set linkedinID(value) {
        this._linkedinID = value;
    }

    /**
     *
     * @returns {String}
     */
    get facebookID() {
        return this._facebookID;
    }

    /**
     *
     * @param {String} value
     */
    set facebookID(value) {
        this._facebookID = value;
    }

    /**
     *
     * @returns {String}
     */
    get lastName() {
        return this._lastName;
    }

    /**
     *
     * @param {String} value
     */
    set lastName(value) {
        this._lastName = value;
    }

    /**
     *
     * @returns {String}
     */

    get firstName() {
        return this._firstName;
    }

    /**
     *
     * @param {String} value
     */
    set firstName(value) {
        this._firstName = value;
    }

    /**
     *
     * @returns {String}
     */
    get username() {
        return this._username;
    }

    /**
     *
     * @param {String} value
     */
    set username(value) {
        this._username = value;
    }

    /**
     *
     * @returns {String}
     */
    get AID() {
        return this._AID;
    }

    /**
     *
     * @param {String} value
     */
    set AID(value) {
        this._AID = value;
    }

    /**
     *
     * @returns {int}
     */
    get ID() {
        return this._ID;
    }

    /**
     *
     * @param {int} value
     */
    set ID(value) {
        this._ID = !isEmpty(value) ? parseInt(value) : null;
    }

    constructor(object){
        super();
        this.ID = this.getValue(object,USER_KEY_ID);
        this.AID = this.getValue(object,USER_KEY_AID);
        this.username = this.getValue(object,USER_KEY_USERNAME);
        this.firstName = this.getValue(object,USER_KEY_FIRSTNAME);
        this.lastName = this.getValue(object,USER_KEY_LASTNAME);
        this.facebookID = this.getValue(object,USER_KEY_FACEBOOK_ID);
        this.linkedinID = this.getValue(object,USER_KEY_LINKEDIN_ID);
        this.twitterID = this.getValue(object,USER_KEY_TWITTER_ID);
        this.email = this.getValue(object,USER_KEY_EMAIL);
        this.phone = this.getValue(object,USER_KEY_PHONE);
        this.version = this.getValue(object,USER_KEY_VERSION);
        this.short = this.getValue(object,USER_KEY_SHORT);
        this.description = this.getValue(object,USER_KEY_DESCRIPTION);
        this.instantiated = this.getValue(object,USER_KEY_INSTANTIATED);



        this.name = this.getParsedName();
        this.profile = this.getParsedPictureProfile();
        this.thumbnail = this.getParsedPictureThumbnail();


        this.inputs = [];
        this.fields = [];
        this.dangers = [];

        this.networks = [];
        this.articles = [];

    }


    getParsedName(){
        return this.firstName !== null ?
            (this.lastName !== null ?
                this.firstName + " " + this.lastName :
                "") :
            (this.lastName !== null ?
                this.lastName :
                "");
    }

    getParsedPictureProfile(){
        return ((!isEmpty(this.AID) &&  !isEmpty(this.version)) && this.version !== 0) ? ROOT+"data/user/"+this.AID+"/profile-"+this.version+".jpg" : PATH_DEFAULT_PICTURE_PERSON;
    }

    getParsedPictureThumbnail(){
        return ((!isEmpty(this.AID) &&  !isEmpty(this.version)) && this.version !== 0) ? ROOT+"data/user/"+this.AID+"/thumbnail-"+this.version+".jpg" : PATH_DEFAULT_PICTURE_PERSON;

    }

    bindPictureProfile(parent = null){
        let self = this;
        if(!parent || !parent.length || (isEmpty(self.AID) && isEmpty(self.version)) || self.version === 0) {
            self.profile = PATH_DEFAULT_PICTURE_PERSON;
            parent.attr("src", PATH_DEFAULT_PICTURE_PERSON).fadeIn(100);
            return;
        }
        parent.hide();
        imageExists(self.profile,function(callback){
            if(!callback) self.profile = PATH_DEFAULT_PICTURE_PERSON;
            parent.attr("src", self.profile).fadeIn(100);
        });
    };

    bindPictureThumbnail(parent = null){
        let self = this;
        if(!parent || !parent.length || (isEmpty(self.AID) && isEmpty(self.version)) || self.version === 0) {
            self.thumbnail = PATH_DEFAULT_PICTURE_PERSON;
            parent.attr("src", PATH_DEFAULT_PICTURE_PERSON).fadeIn(100);
            return;
        }
        parent.hide();
        imageExists(self.thumbnail,function(callback){
            if(!callback) self.thumbnail = PATH_DEFAULT_PICTURE_PERSON;
            parent.attr("src", self.thumbnail).fadeIn(100);
        });
    };



    printSearchRow(parent){
        if(!parent.length || isEmpty(this.AID)) return;
        let print = '<a data-aid="'+this.AID+'" class="search-result"><div class="search-result-picture"><img></div><p class="search-result-name"></p></a>';

        parent.append(print);
        let element = parent.find(".search-result[data-aid='"+this.AID+"']");
        if(element){
            this.bindPictureProfile(element.find(".search-result-picture img"));
            element.find(".search-result-name").text(this.getParsedName()+" ("+this.username+")");

        }


    }


}