"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const constants_1 = require("../constants");
const controllers_1 = require("../controllers");
const SkillRouter = express_1.default.Router();
SkillRouter.get(constants_1.routes.skill.listDefault, controllers_1.SkillController.listDefault);
exports.default = SkillRouter;
