"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArticleModel = exports.toArticleDTO = exports.Article = void 0;
const lodash_1 = __importDefault(require("lodash"));
const shortid_1 = __importDefault(require("shortid"));
const typegoose_1 = require("@typegoose/typegoose");
const user_1 = require("./user");
const skill_1 = require("./skill");
const atoms_1 = require("./atoms");
const image_1 = require("./image");
const category_1 = require("./category");
let Article = /** @class */ (() => {
    class Article {
    }
    __decorate([
        typegoose_1.prop({ default: () => `${shortid_1.default.generate()}_` }),
        __metadata("design:type", String)
    ], Article.prototype, "shortId", void 0);
    __decorate([
        typegoose_1.prop({ required: true, enum: atoms_1.ArticleType, default: atoms_1.ArticleType.Internal }),
        __metadata("design:type", String)
    ], Article.prototype, "type", void 0);
    __decorate([
        typegoose_1.prop({ required: true }),
        __metadata("design:type", String)
    ], Article.prototype, "title", void 0);
    __decorate([
        typegoose_1.prop({ ref: { name: "User" }, required: true }),
        __metadata("design:type", Object)
    ], Article.prototype, "user", void 0);
    __decorate([
        typegoose_1.prop({ ref: { name: "Image" }, default: null }),
        __metadata("design:type", Object)
    ], Article.prototype, "cover", void 0);
    __decorate([
        typegoose_1.prop({ ref: { name: "Image" }, default: null }),
        __metadata("design:type", Object)
    ], Article.prototype, "thumbnail", void 0);
    __decorate([
        typegoose_1.prop(),
        __metadata("design:type", String)
    ], Article.prototype, "url", void 0);
    __decorate([
        typegoose_1.prop(),
        __metadata("design:type", String)
    ], Article.prototype, "content", void 0);
    __decorate([
        typegoose_1.prop(),
        __metadata("design:type", String)
    ], Article.prototype, "summary", void 0);
    __decorate([
        typegoose_1.arrayProp({ itemsRef: "Skill" }),
        __metadata("design:type", Array)
    ], Article.prototype, "skills", void 0);
    __decorate([
        typegoose_1.arrayProp({ itemsRef: "Category" }),
        __metadata("design:type", Array)
    ], Article.prototype, "categories", void 0);
    return Article;
})();
exports.Article = Article;
function toArticleDTO(article, options = { categories: true, skills: true, images: true, user: true, content: false }) {
    var _a, _b;
    const result = {};
    result._id = article._id;
    result.shortId = article.shortId;
    result.type = article.type;
    result.title = article.title;
    result.url = article.url;
    result.createdAt = article.createdAt;
    if (result.type === atoms_1.ArticleType.Internal) {
        result.summary = article.summary;
        if (lodash_1.default.get(options, "content") === true && !lodash_1.default.isNil(article.content))
            result.content = article.content;
    }
    if (lodash_1.default.get(options, "images") === true) {
        if (!lodash_1.default.isNil(article.cover) && typegoose_1.isDocument(article.cover))
            result.cover = image_1.toImageDTO(article.cover);
        if (!lodash_1.default.isNil(article.thumbnail) && typegoose_1.isDocument(article.thumbnail))
            result.thumbnail = image_1.toImageDTO(article.thumbnail);
    }
    if (lodash_1.default.get(options, "user") === true && !lodash_1.default.isNil(article.user) && typegoose_1.isDocument(article.user))
        result.user = user_1.toUserDTO(article.user);
    if (lodash_1.default.get(options, "skills") === true && !lodash_1.default.isNil(article.skills) && typegoose_1.isDocumentArray(article.skills))
        result.skills = (_a = article.skills) === null || _a === void 0 ? void 0 : _a.map(item => skill_1.toSkillDTO(item));
    if (lodash_1.default.get(options, "categories") === true && !lodash_1.default.isNil(article.categories) && typegoose_1.isDocumentArray(article.categories))
        result.categories = (_b = article.categories) === null || _b === void 0 ? void 0 : _b.map(item => category_1.toCategoryDTO(item));
    return result;
}
exports.toArticleDTO = toArticleDTO;
exports.ArticleModel = typegoose_1.getModelForClass(Article, { schemaOptions: { timestamps: true } });
