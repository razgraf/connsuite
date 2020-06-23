"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const connection = process.env.NODE_ENV === "production"
    ? process.env.CONN_BACK_MONGO_PRODUCTION
    : process.env.CONN_BACK_MONGO_DEVELOPMENT;
function config() {
    mongoose_1.default.set("useFindAndModify", false);
    mongoose_1.default.connect(connection || "", { useNewUrlParser: true, useUnifiedTopology: true }, () => console.log("Connected to Mongo DB."));
}
const mongo = {
    config,
};
exports.default = mongo;
