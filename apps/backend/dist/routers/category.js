"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const constants_1 = require("../constants");
const controllers_1 = require("../controllers");
const CategoryRouter = express_1.default.Router();
CategoryRouter.get(constants_1.routes.category.listDefault, controllers_1.CategoryController.listDefault);
exports.default = CategoryRouter;
