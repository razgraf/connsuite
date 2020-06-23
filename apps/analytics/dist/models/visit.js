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
exports.VisitModel = exports.toVisitDTO = exports.Visit = void 0;
const lodash_1 = __importDefault(require("lodash"));
const mongodb_1 = require("mongodb");
const typegoose_1 = require("@typegoose/typegoose");
const atoms_1 = require("./atoms");
let Visit = /** @class */ (() => {
    class Visit {
    }
    __decorate([
        typegoose_1.prop({ required: true, enum: atoms_1.VisitType, default: atoms_1.VisitType.Default }),
        __metadata("design:type", String)
    ], Visit.prototype, "type", void 0);
    __decorate([
        typegoose_1.prop(),
        __metadata("design:type", mongodb_1.ObjectId)
    ], Visit.prototype, "sourceId", void 0);
    __decorate([
        typegoose_1.prop(),
        __metadata("design:type", mongodb_1.ObjectId)
    ], Visit.prototype, "targetId", void 0);
    __decorate([
        typegoose_1.prop({ default: "local" }),
        __metadata("design:type", String)
    ], Visit.prototype, "referer", void 0);
    return Visit;
})();
exports.Visit = Visit;
function toVisitDTO(visit, options = { ids: false }) {
    const result = {};
    result.type = visit.type;
    result.createdAt = visit.createdAt;
    result.referer = visit.referer;
    if (lodash_1.default.get(options, "ids") === true) {
        result.sourceId = visit.sourceId;
        result.targetId = visit.targetId;
    }
    return result;
}
exports.toVisitDTO = toVisitDTO;
exports.VisitModel = typegoose_1.getModelForClass(Visit, { schemaOptions: { timestamps: true } });
