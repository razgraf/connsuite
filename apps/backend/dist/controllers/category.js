"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const base_1 = require("./base");
const constants_1 = require("../constants");
const repositories_1 = require("../repositories");
const models_1 = require("../models");
class CategoryController extends base_1.ManagerController {
    static listDefault(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const categories = yield repositories_1.CategoryRepository.getInstance().list({ isDefault: true });
                res.status(constants_1.HTTP_CODE.OK);
                res.json({
                    message: "Supported default categories.",
                    categories: Object.values(categories).map(item => models_1.toCategoryDTO(item)),
                });
            }
            catch (e) {
                res.status(e.code || constants_1.HTTP_CODE.BAD_REQUEST);
                res.json({ message: e.message });
            }
        });
    }
}
exports.default = CategoryController;
