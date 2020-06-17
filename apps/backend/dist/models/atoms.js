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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserTier = exports.ArticleType = exports.ImagePurpose = exports.ImageParent = exports.NetworkType = exports.Vendor = exports.Name = void 0;
const typegoose_1 = require("@typegoose/typegoose");
let Name = /** @class */ (() => {
    class Name {
    }
    __decorate([
        typegoose_1.prop({ required: true }),
        __metadata("design:type", String)
    ], Name.prototype, "first", void 0);
    __decorate([
        typegoose_1.prop({ required: true }),
        __metadata("design:type", String)
    ], Name.prototype, "last", void 0);
    return Name;
})();
exports.Name = Name;
var Vendor;
(function (Vendor) {
    Vendor["GOOGLE"] = "GOOGLE";
    Vendor["CLASSIC"] = "CLASSIC";
})(Vendor = exports.Vendor || (exports.Vendor = {}));
var NetworkType;
(function (NetworkType) {
    NetworkType["External"] = "external";
    NetworkType["Internal"] = "internal";
})(NetworkType = exports.NetworkType || (exports.NetworkType = {}));
var ImageParent;
(function (ImageParent) {
    ImageParent["Network"] = "network";
    ImageParent["Article"] = "article";
    ImageParent["User"] = "user";
})(ImageParent = exports.ImageParent || (exports.ImageParent = {}));
var ImagePurpose;
(function (ImagePurpose) {
    ImagePurpose["Cover"] = "cover";
    ImagePurpose["Icon"] = "icon";
    ImagePurpose["Thumbnail"] = "thumbnail";
})(ImagePurpose = exports.ImagePurpose || (exports.ImagePurpose = {}));
var ArticleType;
(function (ArticleType) {
    ArticleType["External"] = "external";
    ArticleType["Internal"] = "internal";
})(ArticleType = exports.ArticleType || (exports.ArticleType = {}));
var UserTier;
(function (UserTier) {
    UserTier[UserTier["Bronze"] = 5] = "Bronze";
    UserTier[UserTier["Silver"] = 10] = "Silver";
    UserTier[UserTier["Gold"] = 15] = "Gold";
    UserTier[UserTier["Platinum"] = 20] = "Platinum";
})(UserTier = exports.UserTier || (exports.UserTier = {}));
