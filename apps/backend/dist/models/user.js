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
exports.UserModel = exports.toUserDTO = exports.User = void 0;
const lodash_1 = __importDefault(require("lodash"));
const typegoose_1 = require("@typegoose/typegoose");
const atoms_1 = require("./atoms");
const article_1 = require("./article");
const image_1 = require("./image");
const network_1 = require("./network");
const username_1 = require("./username");
const constants_1 = require("../constants");
let User = /** @class */ (() => {
    class User {
    }
    __decorate([
        typegoose_1.prop({ required: true, default: constants_1.defaults.tagline }),
        __metadata("design:type", String)
    ], User.prototype, "description", void 0);
    __decorate([
        typegoose_1.prop({ required: true }),
        __metadata("design:type", String)
    ], User.prototype, "email", void 0);
    __decorate([
        typegoose_1.prop(),
        __metadata("design:type", String)
    ], User.prototype, "password", void 0);
    __decorate([
        typegoose_1.prop(),
        __metadata("design:type", String)
    ], User.prototype, "googleId", void 0);
    __decorate([
        typegoose_1.prop({ required: true }),
        __metadata("design:type", atoms_1.Name)
    ], User.prototype, "name", void 0);
    __decorate([
        typegoose_1.prop({ default: constants_1.defaults.tagline }),
        __metadata("design:type", String)
    ], User.prototype, "tagline", void 0);
    __decorate([
        typegoose_1.arrayProp({ itemsRef: "Username" }),
        __metadata("design:type", Array)
    ], User.prototype, "usernames", void 0);
    __decorate([
        typegoose_1.arrayProp({ itemsRef: "Network" }),
        __metadata("design:type", Array)
    ], User.prototype, "networks", void 0);
    __decorate([
        typegoose_1.arrayProp({ itemsRef: "Articles" }),
        __metadata("design:type", Array)
    ], User.prototype, "articles", void 0);
    __decorate([
        typegoose_1.prop({ ref: { name: "Image" }, default: null }),
        __metadata("design:type", Object)
    ], User.prototype, "picture", void 0);
    __decorate([
        typegoose_1.prop({ ref: { name: "Image" }, default: null }),
        __metadata("design:type", Object)
    ], User.prototype, "thumbnail", void 0);
    __decorate([
        typegoose_1.prop({ required: true, enum: atoms_1.UserTier, default: atoms_1.UserTier.Bronze }),
        __metadata("design:type", Number)
    ], User.prototype, "tier", void 0);
    __decorate([
        typegoose_1.prop({}),
        __metadata("design:type", String)
    ], User.prototype, "calendly", void 0);
    return User;
})();
exports.User = User;
function toUserDTO(user, options = { usernames: false, networks: false, articles: false, images: true }) {
    var _a, _b, _c;
    const result = {};
    result._id = user._id;
    result.description = user.description;
    result.email = user.email;
    result.tagline = user.tagline;
    result.calendly = user.calendly;
    result.tier = user.tier;
    result.name = {
        first: lodash_1.default.get(user, "name.first"),
        last: lodash_1.default.get(user, "name.last"),
    };
    if (lodash_1.default.get(options, "usernames") === true && !lodash_1.default.isNil(user.usernames) && typegoose_1.isDocumentArray(user.usernames)) {
        result.usernames = (_a = user.usernames) === null || _a === void 0 ? void 0 : _a.map(item => username_1.toUsernameDTO(item));
    }
    if (lodash_1.default.get(options, "networks") === true && !lodash_1.default.isNil(user.networks) && typegoose_1.isDocumentArray(user.networks)) {
        result.networks = (_b = user.networks) === null || _b === void 0 ? void 0 : _b.map(item => network_1.toNetworkDTO(item));
    }
    if (lodash_1.default.get(options, "articles") === true && !lodash_1.default.isNil(user.articles) && typegoose_1.isDocumentArray(user.articles)) {
        result.articles = (_c = user.articles) === null || _c === void 0 ? void 0 : _c.map(articles => article_1.toArticleDTO(articles));
    }
    if (lodash_1.default.get(options, "images") === true) {
        if (!lodash_1.default.isNil(user.picture) && typegoose_1.isDocument(user.picture))
            result.picture = image_1.toImageDTO(user.picture);
        if (!lodash_1.default.isNil(user.thumbnail) && typegoose_1.isDocument(user.thumbnail))
            result.thumbnail = image_1.toImageDTO(user.thumbnail);
    }
    return result;
}
exports.toUserDTO = toUserDTO;
exports.UserModel = typegoose_1.getModelForClass(User, { schemaOptions: { timestamps: true } });
