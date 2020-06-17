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
exports.SkillModel = exports.toSkillDTO = exports.Skill = void 0;
const lodash_1 = __importDefault(require("lodash"));
const typegoose_1 = require("@typegoose/typegoose");
const user_1 = require("./user");
const article_1 = require("./article");
let Skill = /** @class */ (() => {
    class Skill {
    }
    __decorate([
        typegoose_1.prop({ required: true }),
        __metadata("design:type", String)
    ], Skill.prototype, "title", void 0);
    __decorate([
        typegoose_1.prop({ required: true, default: false }),
        __metadata("design:type", Boolean)
    ], Skill.prototype, "isDefault", void 0);
    __decorate([
        typegoose_1.prop({ ref: { name: "User" } }),
        __metadata("design:type", Object)
    ], Skill.prototype, "user", void 0);
    __decorate([
        typegoose_1.prop({ ref: { name: "Article" } }),
        __metadata("design:type", Object)
    ], Skill.prototype, "article", void 0);
    return Skill;
})();
exports.Skill = Skill;
function toSkillDTO(skill, options = { user: false, article: false }) {
    const result = {};
    result._id = skill._id;
    result.title = skill.title;
    result.isDefault = skill.isDefault;
    if (lodash_1.default.get(options, "user") === true && lodash_1.default.isNil(skill.user) && typegoose_1.isDocument(skill.user)) {
        result.user = user_1.toUserDTO(skill.user);
    }
    if (lodash_1.default.get(options, "article") === true && lodash_1.default.isNil(skill.article) && typegoose_1.isDocument(skill.article)) {
        result.article = article_1.toArticleDTO(skill.article);
    }
    return result;
}
exports.toSkillDTO = toSkillDTO;
exports.SkillModel = typegoose_1.getModelForClass(Skill, { schemaOptions: { timestamps: true } });
