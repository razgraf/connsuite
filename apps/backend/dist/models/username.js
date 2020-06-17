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
exports.UsernameModel = exports.toUsernameDTO = exports.Username = void 0;
const lodash_1 = __importDefault(require("lodash"));
const typegoose_1 = require("@typegoose/typegoose");
const user_1 = require("./user");
let Username = /** @class */ (() => {
    class Username {
    }
    __decorate([
        typegoose_1.prop({ required: true, default: false }),
        __metadata("design:type", Boolean)
    ], Username.prototype, "isPrimary", void 0);
    __decorate([
        typegoose_1.prop({ ref: { name: "User" }, required: true }),
        __metadata("design:type", Object)
    ], Username.prototype, "user", void 0);
    __decorate([
        typegoose_1.prop({ required: true }),
        __metadata("design:type", String)
    ], Username.prototype, "value", void 0);
    return Username;
})();
exports.Username = Username;
function toUsernameDTO(username, options = { user: false }) {
    const result = {};
    result._id = username._id;
    result.isPrimary = username.isPrimary;
    result.value = username.value;
    if (lodash_1.default.get(options, "user") === true && lodash_1.default.isNil(username.user) && typegoose_1.isDocument(username.user))
        result.user = user_1.toUserDTO(username.user);
    return result;
}
exports.toUsernameDTO = toUsernameDTO;
exports.UsernameModel = typegoose_1.getModelForClass(Username, { schemaOptions: { timestamps: true } });
