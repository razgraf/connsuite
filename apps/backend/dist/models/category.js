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
exports.CategoryModel = exports.toCategoryDTO = exports.Category = void 0;
const lodash_1 = __importDefault(require("lodash"));
const typegoose_1 = require("@typegoose/typegoose");
const user_1 = require("./user");
const article_1 = require("./article");
let Category = /** @class */ (() => {
    class Category {
    }
    __decorate([
        typegoose_1.prop({ required: true }),
        __metadata("design:type", String)
    ], Category.prototype, "title", void 0);
    __decorate([
        typegoose_1.prop({ required: true, default: false }),
        __metadata("design:type", Boolean)
    ], Category.prototype, "isDefault", void 0);
    __decorate([
        typegoose_1.prop({ ref: { name: "User" } }),
        __metadata("design:type", Object)
    ], Category.prototype, "user", void 0);
    __decorate([
        typegoose_1.prop({ ref: { name: "Article" } }),
        __metadata("design:type", Object)
    ], Category.prototype, "article", void 0);
    return Category;
})();
exports.Category = Category;
function toCategoryDTO(category, options = { user: false, article: false }) {
    const result = {};
    result._id = category._id;
    result.title = category.title;
    result.isDefault = category.isDefault;
    if (lodash_1.default.get(options, "user") === true && lodash_1.default.isNil(category.user) && typegoose_1.isDocument(category.user)) {
        result.user = user_1.toUserDTO(category.user);
    }
    if (lodash_1.default.get(options, "article") === true && lodash_1.default.isNil(category.article) && typegoose_1.isDocument(category.article)) {
        result.article = article_1.toArticleDTO(category.article);
    }
    return result;
}
exports.toCategoryDTO = toCategoryDTO;
exports.CategoryModel = typegoose_1.getModelForClass(Category, { schemaOptions: { timestamps: true } });
