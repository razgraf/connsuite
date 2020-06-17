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
exports.ImageModel = exports.toImageDTO = exports.Image = void 0;
const lodash_1 = __importDefault(require("lodash"));
const typegoose_1 = require("@typegoose/typegoose");
const constants_1 = require("../constants");
const constants_2 = require("../constants");
const atoms_1 = require("./atoms");
const article_1 = require("./article");
const network_1 = require("./network");
const user_1 = require("./user");
let Image = /** @class */ (() => {
    class Image {
    }
    __decorate([
        typegoose_1.prop({ required: true, enum: atoms_1.ImageParent, default: atoms_1.ImageParent.Network }),
        __metadata("design:type", String)
    ], Image.prototype, "parent", void 0);
    __decorate([
        typegoose_1.prop(),
        __metadata("design:type", String)
    ], Image.prototype, "type", void 0);
    __decorate([
        typegoose_1.prop({ enum: atoms_1.ImagePurpose, default: atoms_1.ImagePurpose.Icon }),
        __metadata("design:type", String)
    ], Image.prototype, "purpose", void 0);
    __decorate([
        typegoose_1.prop({ ref: { name: "Network" }, default: null }),
        __metadata("design:type", Object)
    ], Image.prototype, "network", void 0);
    __decorate([
        typegoose_1.prop({ ref: { name: "Article" }, default: null }),
        __metadata("design:type", Object)
    ], Image.prototype, "article", void 0);
    __decorate([
        typegoose_1.prop({ ref: { name: "User" }, default: null }),
        __metadata("design:type", Object)
    ], Image.prototype, "user", void 0);
    return Image;
})();
exports.Image = Image;
function interpret(image, result = {}) {
    if (image.parent === atoms_1.ImageParent.Network) {
        const type = lodash_1.default.attempt(() => lodash_1.default.toString(lodash_1.default.get(image || {}, "type") || "").split("/")[1]);
        if (lodash_1.default.isNil(image._id) || lodash_1.default.isError(type) || lodash_1.default.isNil(type))
            return;
        if (Object.keys(constants_2.networks).includes(String(image._id)))
            result.url = `${constants_1.atoms.root}/${constants_1.atoms.tree.externalNetwork}/${image.purpose}/${image._id}.${type}`;
        else
            result.url = `${constants_1.atoms.root}/${constants_1.atoms.tree.internalNetwork}/${image._id}.${type}`;
    }
    else if (image.parent === atoms_1.ImageParent.Article) {
        const type = lodash_1.default.attempt(() => lodash_1.default.toString(lodash_1.default.get(image || {}, "type") || "").split("/")[1]);
        if (lodash_1.default.isNil(image._id) || lodash_1.default.isError(type) || lodash_1.default.isNil(type))
            return;
        result.url = `${constants_1.atoms.root}/${constants_1.atoms.tree.article}/${image._id}.${type}`;
    }
    else if (image.parent === atoms_1.ImageParent.User) {
        const type = lodash_1.default.attempt(() => lodash_1.default.toString(lodash_1.default.get(image || {}, "type") || "").split("/")[1]);
        if (lodash_1.default.isNil(image._id) || lodash_1.default.isError(type) || lodash_1.default.isNil(type))
            return;
        result.url = `${constants_1.atoms.root}/${constants_1.atoms.tree.user}/${image._id}.${type}`;
    }
}
function toImageDTO(image, options = { parent: false, interpret: true }) {
    const result = {};
    result.type = image.type;
    result.parent = image.parent;
    if (lodash_1.default.get(options, "parent") === true) {
        switch (result.parent) {
            case atoms_1.ImageParent.Article:
                if (!lodash_1.default.isNil(image.article) && typegoose_1.isDocument(image.article))
                    result.article = article_1.toArticleDTO(image.article);
                break;
            case atoms_1.ImageParent.Network:
                if (!lodash_1.default.isNil(image.network) && typegoose_1.isDocument(image.network))
                    result.network = network_1.toNetworkDTO(image.network);
                break;
            case atoms_1.ImageParent.User:
                if (!lodash_1.default.isNil(image.user) && typegoose_1.isDocument(image.user))
                    result.user = user_1.toUserDTO(image.user);
                break;
            default:
                break;
        }
    }
    if (lodash_1.default.get(options, "interpret") === true)
        interpret(image, result);
    return result;
}
exports.toImageDTO = toImageDTO;
exports.ImageModel = typegoose_1.getModelForClass(Image, { schemaOptions: { timestamps: true } });
