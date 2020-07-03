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
exports.NetworkModel = exports.toNetworkDTO = exports.Network = void 0;
const lodash_1 = __importDefault(require("lodash"));
const shortid_1 = __importDefault(require("shortid"));
const typegoose_1 = require("@typegoose/typegoose");
const constants_1 = require("../constants");
const atoms_1 = require("./atoms");
const user_1 = require("./user");
const image_1 = require("./image");
let Network = /** @class */ (() => {
    class Network {
    }
    __decorate([
        typegoose_1.prop({ default: () => `${shortid_1.default.generate()}_` }),
        __metadata("design:type", String)
    ], Network.prototype, "shortId", void 0);
    __decorate([
        typegoose_1.prop({ required: true, enum: atoms_1.NetworkType, default: atoms_1.NetworkType.Internal }),
        __metadata("design:type", String)
    ], Network.prototype, "type", void 0);
    __decorate([
        typegoose_1.prop({ ref: { name: "User" }, required: true }),
        __metadata("design:type", Object)
    ], Network.prototype, "user", void 0);
    __decorate([
        typegoose_1.prop({ default: 0 }),
        __metadata("design:type", Number)
    ], Network.prototype, "priority", void 0);
    __decorate([
        typegoose_1.prop(),
        __metadata("design:type", String)
    ], Network.prototype, "title", void 0);
    __decorate([
        typegoose_1.prop(),
        __metadata("design:type", String)
    ], Network.prototype, "description", void 0);
    __decorate([
        typegoose_1.prop(),
        __metadata("design:type", String)
    ], Network.prototype, "username", void 0);
    __decorate([
        typegoose_1.prop(),
        __metadata("design:type", String)
    ], Network.prototype, "url", void 0);
    __decorate([
        typegoose_1.prop(),
        __metadata("design:type", String)
    ], Network.prototype, "externalId", void 0);
    __decorate([
        typegoose_1.prop({ ref: { name: "Image" }, default: null }),
        __metadata("design:type", Object)
    ], Network.prototype, "icon", void 0);
    __decorate([
        typegoose_1.prop({ ref: { name: "Image" }, default: null }),
        __metadata("design:type", Object)
    ], Network.prototype, "thumbnail", void 0);
    return Network;
})();
exports.Network = Network;
function interpret(network, result = {}) {
    if (network.type === atoms_1.NetworkType.External) {
        if (lodash_1.default.isNil(network.externalId) || !lodash_1.default.has(constants_1.networks, network.externalId))
            return;
        const supported = constants_1.networks[network.externalId];
        result.title = supported.title;
        result.url = supported.url + (!lodash_1.default.isNil(network.username) ? "/" + network.username : "");
        result.icon = image_1.toImageDTO(supported.icon);
        result.thumbnail = image_1.toImageDTO(supported.thumbnail);
    }
}
function toNetworkDTO(network, options = { images: true, user: true, interpret: true }) {
    const result = {};
    result._id = network._id;
    result.shortId = network.shortId;
    result.type = network.type;
    result.priority = network.priority;
    result.title = network.title;
    result.description = network.description;
    result.username = network.username;
    result.url = network.url;
    if (lodash_1.default.get(options, "user") === true && !lodash_1.default.isNil(network.user) && typegoose_1.isDocument(network.user)) {
        result.user = user_1.toUserDTO(network.user);
    }
    if (lodash_1.default.get(options, "images") === true) {
        if (!lodash_1.default.isNil(network.icon) && typegoose_1.isDocument(network.icon))
            result.icon = image_1.toImageDTO(network.icon);
        if (!lodash_1.default.isNil(network.thumbnail) && typegoose_1.isDocument(network.thumbnail))
            result.thumbnail = image_1.toImageDTO(network.thumbnail);
    }
    if (lodash_1.default.get(options, "interpret") === true)
        interpret(network, result);
    return result;
}
exports.toNetworkDTO = toNetworkDTO;
exports.NetworkModel = typegoose_1.getModelForClass(Network, { schemaOptions: { timestamps: true } });
