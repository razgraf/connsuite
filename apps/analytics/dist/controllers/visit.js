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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = __importDefault(require("lodash"));
const base_1 = require("./base");
const constants_1 = require("../constants");
const repositories_1 = require("../repositories");
class VisitController extends base_1.ManagerController {
    static get(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { query, params } = req;
                const result = yield repositories_1.VisitRepository.getInstance().getForItem({
                    userId: lodash_1.default.get(res, "locals.identity.user"),
                    targetId: lodash_1.default.get(params, "id"),
                    type: lodash_1.default.get(query, "type"),
                }, {
                    from: lodash_1.default.get(query, "from"),
                    to: lodash_1.default.get(query, "to"),
                });
                res.status(constants_1.HTTP_CODE.OK);
                res.json({
                    message: "Counted",
                    result,
                });
            }
            catch (e) {
                console.error(e);
                res.status(constants_1.HTTP_CODE.BAD_REQUEST);
                res.json({ message: "Nope" });
            }
        });
    }
    static create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { body } = req;
                body.sourceId = lodash_1.default.get(res, "locals.identity.user");
                yield repositories_1.VisitRepository.getInstance().createSanitized(body);
                res.status(constants_1.HTTP_CODE.OK);
                res.json({
                    message: "Created",
                });
            }
            catch (e) {
                console.error(e);
                res.status(constants_1.HTTP_CODE.BAD_REQUEST);
                res.json({ message: "Stopped due to specific issues." });
            }
        });
    }
    static list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { query } = req;
                const result = yield repositories_1.VisitRepository.getInstance().listForType({
                    userId: lodash_1.default.get(res, "locals.identity.user"),
                    type: lodash_1.default.get(query, "type"),
                }, {
                    from: lodash_1.default.get(query, "from"),
                    to: lodash_1.default.get(query, "to"),
                });
                res.status(constants_1.HTTP_CODE.OK);
                res.json({
                    message: "Counted",
                    result,
                });
            }
            catch (e) {
                console.error(e);
                res.status(constants_1.HTTP_CODE.BAD_REQUEST);
                res.json({ message: "Query not supported" });
            }
        });
    }
}
exports.default = VisitController;
