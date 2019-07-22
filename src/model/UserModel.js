import {Helper} from "../config/Util";
import ImageModel from "./ImageModel";
import PropTypes from "prop-types";
import NetworkModel from "./NetworkModel";
import {ArticleModel} from "./ArticleModel";

/**
 * Created by @VanSoftware on 2019-07-18.
 */

class UsernameModel{
    get main() {
        return this._main;
    }

    set main(value) {
        this._main = value;
    }

    get alias() {
        return this._alias;
    }

    set alias(value) {
        this._alias = !Helper.isEmpty(value) && (value instanceof Array) ? value : [];
    }

    static PARAM_MAIN = 'main';
    static PARAM_ALIAS = 'alias';

    constructor(object){
        this.main = Helper.getValue(UsernameModel.PARAM_MAIN, object);
        this.alias = Helper.getArray(UsernameModel.PARAM_ALIAS, object);
    }


    static clone(item){
        return new UsernameModel(item.toObject())
    }
    clone(){
        return new UsernameModel(this.toObject());
    }


    toObject(){
        return {
            main : this.main,
            alias : !Helper.isEmpty(this.alias) ? this.alias : [],
        }
    }


    static propTypes = {
        main : PropTypes.string,
        alias : PropTypes.arrayOf(PropTypes.string)
    }

}

class UserModel{
    get description() {
        return this._description;
    }

    set description(value) {
        this._description = value;
    }

    get networks() {
        return this._networks;
    }

    set networks(value) {
        this._networks = value;
    }

    get articles() {
        return this._articles;
    }

    set articles(value) {
        this._articles = value;
    }
    get name() {
        return this._name;
    }

    set name(value) {
        this._name = value;
    }
    get AID() {
        return this._AID;
    }

    set AID(value) {
        this._AID = value;
    }

    get firstName() {
        return this._firstName;
    }

    set firstName(value) {
        this._firstName = value;
        this.generateName();
    }

    get lastName() {
        return this._lastName;
    }

    set lastName(value) {
        this._lastName = value;
        this.generateName();
    }

    get username() {
        return this._username;
    }

    set username(value) {
        this._username = value;
    }

    get image() {
        return this._image;
    }

    set image(value) {
        this._image = value;
    }

    get thumbnail() {
        return this._thumbnail;
    }

    set thumbnail(value) {
        this._thumbnail = value;
    }

    get self() {
        return this._self;
    }

    set self(value) {
        this._self = !Helper.isEmpty(value) && value !== "false";
    }


    static PARAM_AID = 'AID';
    static PARAM_FIRST_NAME = 'firstName';
    static PARAM_LAST_NAME = 'lastName';
    static PARAM_USERNAME = 'username';
    static PARAM_IMAGE = 'image';
    static PARAM_THUMBNAIL = 'thumbnail';
    static PARAM_SELF = 'self';
    static PARAM_NAME = 'name';

    static PARAM_NETWORKS = 'networks';
    static PARAM_ARTICLES = 'articles';
    static PARAM_DESCRIPTION = 'description';


    constructor(object){
        this.AID = Helper.getValue(UserModel.PARAM_AID, object);
        this.firstName = Helper.getValue(UserModel.PARAM_FIRST_NAME, object);
        this.lastName = Helper.getValue(UserModel.PARAM_LAST_NAME, object);
        this.username = new UsernameModel(Helper.getValue(UserModel.PARAM_USERNAME, object));
        this.description = Helper.getValue(UserModel.PARAM_DESCRIPTION, object);

        this.image = new ImageModel(Helper.getValue(UserModel.PARAM_IMAGE, object));
        this.thumbnail = new ImageModel(Helper.getValue(UserModel.PARAM_THUMBNAIL, object));

        this.self = Helper.getValue(UserModel.PARAM_SELF,object);


        this.networks = Helper.parseArrayElementWithClass(Helper.getArray(UserModel.PARAM_NETWORKS,object), (element) => new NetworkModel(element));
        this.articles = Helper.parseArrayElementWithClass(Helper.getArray(UserModel.PARAM_ARTICLES,object), (element)=> new ArticleModel(element));


    }






    generateName = () => {
        let name = "";
        if(!Helper.isEmpty(this.firstName)) name = this.firstName;
        if(!Helper.isEmpty(this.lastName)) name += ` ${this.lastName}`;
        this.name = name;
        return name;
    };


    static clone(item){
        return new UserModel(item.toObject())
    }
    clone(){
        return new UserModel(this.toObject());
    }

    toObject(){
        return {
            AID : this.AID,
            firstName : this.firstName,
            lastName : this.lastName,
            description : this.description,
            username : this.username.toObject(),
            image : this.image.toObject(),
            thumbnail : this.thumbnail.toObject(),
            self : this.self,
            networks : (()=>{
                let n = {};
                try {
                    if (!Helper.isEmpty(this.networks))
                        this.networks.forEach((element)=>{
                            n.push(element.toObject())
                    })
                    }catch (e) {console.log(e)
                }
                return  n;
            })(),
            articles :(()=>{
            let a = {};
            try {
                if (!Helper.isEmpty(this.articles))
                    this.articles.forEach((element)=>{
                        a.push(element.toObject())
                    })
            }catch (e) {console.log(e)
            }
            return  a;
        })(),

        }
    }



    static propTypes = PropTypes.shape({
        AID : PropTypes.string,
        firstName : PropTypes.string,
        lastName : PropTypes.string,
        username : PropTypes.shape(UsernameModel.propTypes),
        self : PropTypes.bool,
        description : PropTypes.string,

        networks : PropTypes.arrayOf(PropTypes.shape(NetworkModel.propTypes)),
        articles : PropTypes.arrayOf(PropTypes.shape(ArticleModel.propTypes)),


        image : PropTypes.shape(ImageModel.propTypes),
        thumbnail : PropTypes.shape(ImageModel.propTypes),

    });
}




export {
    UsernameModel,
    UserModel
}