import {Helper} from "../config/Util";
import ImageModel from "./ImageModel";
import PropTypes from "prop-types";
import SkillModel from "./SkillModel";

/**
 * Created by @VanSoftware on 2019-07-22.
 */

class ArticleCategoryModel{


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


    constructor(object){
        this.AID = Helper.getValue(ArticleCategoryModel.PARAM_AID, object);
        this.title = Helper.getValue(ArticleCategoryModel.PARAM_TITLE, object);
    }


    static clone(item){
        return new ArticleCategoryModel(item.toObject())
    }
    clone(){
        return new ArticleCategoryModel(this.toObject());
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


class ArticleModel {
    get titleEncoded() {
        return this._titleEncoded;
    }

    set titleEncoded(value) {
        this._titleEncoded = value;
    }
    get type() {
        return this._type;
    }

    set type(value) {
        this._type = value;
    }

    get source() {
        return this._source;
    }

    set source(value) {
        this._source = value;
    }
    get content() {
        return this._content;
    }

    set content(value) {
        this._content = value;
    }

    get createdAt() {
        return this._createdAt;
    }

    set createdAt(value) {
        this._createdAt = value;
    }

    get updatedAt() {
        return this._updatedAt;
    }

    set updatedAt(value) {
        this._updatedAt = value;
    }
    get description() {
        return this._description;
    }

    set description(value) {
        this._description = value;
    }
    get priority() {
        return this._priority;
    }

    set priority(value) {
        this._priority = value;
    }
    get skills() {
        return this._skills;
    }

    set skills(value) {
        this._skills = value;
    }
    get title() {
        return this._title;
    }

    set title(value) {
        this._title = value;
    }

    get image() {
        return this._image;
    }

    set image(value) {
        this._image = value;
    }

    get categories() {
        return this._categories;
    }

    set categories(value) {
        this._categories = value;
    }

    get AID() {
        return this._AID;
    }

    set AID(value) {
        this._AID = value;
    }




    static PARAM_AID = "AID";
    static PARAM_TITLE = "title";
    static PARAM_IMAGE = "image";
    static PARAM_CATEGORIES = "categories";
    static PARAM_SKILLS = "skills";
    static PARAM_PRIORITY = "priority";
    static PARAM_DESCRIPTION = "description";
    static PARAM_CONTENT = "content";
    static PARAM_CREATED_AT = "createdAt";
    static PARAM_UPDATED_AT = "updatedAt";
    static PARAM_TYPE = "type";
    static PARAM_SOURCE = "source";
    static PARAM_TITLE_ENCODED = "titleEncoded";

    static TYPE_EXTERNAL = 2;
    static TYPE_INTERNAL = 1;

    
    constructor(object) {

        this.AID = Helper.getValue(ArticleModel.PARAM_AID, object);
        this.title = Helper.getValue(ArticleModel.PARAM_TITLE, object);
        this.titleEncoded = Helper.getValue(ArticleModel.PARAM_TITLE_ENCODED, object);
        this.image = new ImageModel(Helper.getObject(ArticleModel.PARAM_IMAGE, object));
        this.categories = Helper.parseArrayElementWithClass(Helper.getArray(ArticleModel.PARAM_CATEGORIES,object), function(element){return new ArticleCategoryModel(element)});
        this.skills = Helper.parseArrayElementWithClass(Helper.getArray(ArticleModel.PARAM_SKILLS,object), function(element){return new SkillModel(element)})
        this.priority = Helper.getValue(ArticleModel.PARAM_PRIORITY, object);
        
        this.description = Helper.getValue(ArticleModel.PARAM_DESCRIPTION, object);
        this.content = Helper.getValue(ArticleModel.PARAM_CONTENT, object);
        
        this.createdAt =  Helper.getValue(ArticleModel.PARAM_CREATED_AT, object);
        this.updatedAt =  Helper.getValue(ArticleModel.PARAM_UPDATED_AT, object);

        this.type = Helper.sanitize(Helper.getValue(ArticleModel.PARAM_TYPE, object), 0);
        this.source = Helper.getValue(ArticleModel.PARAM_SOURCE, object);


    }


    static clone(item){
        return new ArticleModel(item.toObject())
    }
    clone(){
        return new ArticleModel(this.toObject());
    }


    toObject(){
        return {
            AID : this.AID,
            title : this.title,
            titleEncoded : this.titleEncoded,
            priority : this.priority,

            description : this.description,
            content : this.content,

            type : this.type,
            source : this.source,

            createdAt : this.createdAt,
            updatedAt : this.updatedAt,

            image : this.image.toObject(),
            categories : (()=>{
                let c = [];
                try {
                    if (!Helper.isEmpty(this.categories))
                        this.categories.forEach((element)=>{
                            c.push(element.toObject())
                        })
                }catch (e) {console.log(e)}
                return c;
            })(),
            skills : (()=>{
                let s = [];
                try {
                    if (!Helper.isEmpty(this.skills))
                        this.skills.forEach((element)=>{
                            s.push(element.toObject())
                        })
                }catch (e) {console.log(e)}
                return s;
            })(),
        }
    }


    static propTypes = {
        AID : PropTypes.string,
        title : PropTypes.string,
        titleEncoded : PropTypes.string,
        image : PropTypes.shape(ImageModel.propTypes),
        categories : PropTypes.arrayOf(PropTypes.shape(ArticleCategoryModel.propTypes)),
        skills : PropTypes.arrayOf(PropTypes.shape(SkillModel.propTypes)),


        type : PropTypes.number,
        source : PropTypes.string,

        description : PropTypes.string,
        content : PropTypes.string,

        createdAt : PropTypes.string,
        updatedAt : PropTypes.string,

    };

    static defaultProps = {
        categories : [],
        skills : [],
        type : 0,
        titleEncoded : "Article"
    };

}


export {
    ArticleCategoryModel,
    ArticleModel
}

