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
exports.UsersafeModel = exports.Usersafe = void 0;
const typegoose_1 = require("@typegoose/typegoose");
/**
 * @class Usersafe
 * Created a "safe token" for an extra layer of protection at auth. Verify in the JWT that the received safe matches the userId
 */
let Usersafe = /** @class */ (() => {
    class Usersafe {
    }
    __decorate([
        typegoose_1.prop({ ref: { name: "User" }, required: true }),
        __metadata("design:type", Object)
    ], Usersafe.prototype, "user", void 0);
    __decorate([
        typegoose_1.prop({ required: true }),
        __metadata("design:type", String)
    ], Usersafe.prototype, "safe", void 0);
    __decorate([
        typegoose_1.prop(),
        __metadata("design:type", String)
    ], Usersafe.prototype, "agent", void 0);
    return Usersafe;
})();
exports.Usersafe = Usersafe;
exports.UsersafeModel = typegoose_1.getModelForClass(Usersafe, {
    schemaOptions: { timestamps: true, collection: "usersafes" },
});
