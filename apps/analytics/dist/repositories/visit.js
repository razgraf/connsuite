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
const mongodb_1 = require("mongodb");
const base_1 = __importDefault(require("./base"));
const errors_1 = require("../errors");
const models_1 = require("../models");
const utils_1 = require("../utils");
class VisitRepository extends base_1.default {
    static getInstance() {
        return VisitRepository.instance || (VisitRepository.instance = new VisitRepository());
    }
    getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return models_1.VisitModel.findById(id);
        });
    }
    create(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            return models_1.VisitModel.create(payload);
        });
    }
    update(id, payload) {
        return __awaiter(this, void 0, void 0, function* () {
            return models_1.VisitModel.findByIdAndUpdate(id, payload, { new: true });
        });
    }
    remove(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield models_1.VisitModel.findByIdAndRemove(id);
        });
    }
    list(filters, options) {
        return __awaiter(this, void 0, void 0, function* () {
            return !lodash_1.default.isNil(options)
                ? models_1.VisitModel.find(filters, null, this._formatByOptions(options)).populate(this._populateByOptions(options))
                : models_1.VisitModel.find(filters);
        });
    }
    /**
     *
     *
     * Specific Public Methods
     *
     *
     */
    createSanitized(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            if (lodash_1.default.isNil(payload))
                throw new errors_1.ParamsError.Missing("Missing valid payload.");
            if (!lodash_1.default.get(payload, "type") || !Object.values(models_1.VisitType).includes(lodash_1.default.get(payload, "type")))
                throw new errors_1.ParamsError.Invalid("Type missing or not supported.");
            if (!lodash_1.default.get(payload, "targetId"))
                throw new errors_1.ParamsError.Missing("Missing target.");
            const visit = {
                type: lodash_1.default.toString(lodash_1.default.get(payload, "type")),
                targetId: new mongodb_1.ObjectId(lodash_1.default.get(payload, "targetId")),
                sourceId: lodash_1.default.get(payload, "sourceId") ? new mongodb_1.ObjectId(lodash_1.default.get(payload, "sourceId")) : undefined,
            };
            if (lodash_1.default.has(payload, "referer"))
                visit.referer = lodash_1.default.toString(lodash_1.default.get(payload, "referer"));
            return this.create(visit);
        });
    }
    /**  */
    getForItem(payload, options) {
        return __awaiter(this, void 0, void 0, function* () {
            if (lodash_1.default.isNil(payload))
                throw new errors_1.ParamsError.Missing("Missing valid payload.");
            if (!lodash_1.default.get(payload, "type") || !Object.values(models_1.VisitType).includes(lodash_1.default.get(payload, "type")))
                throw new errors_1.ParamsError.Invalid("Type missing or not supported.");
            if (!lodash_1.default.get(payload, "targetId"))
                throw new errors_1.ParamsError.Missing("Missing target.");
            if (!lodash_1.default.get(payload, "userId"))
                throw new errors_1.ParamsError.Missing("Missing owner.");
            switch (payload.type) {
                case models_1.VisitType.Network:
                    return this._getForNetwork(payload, options);
                case models_1.VisitType.Article:
                    return this._getForArticle(payload, options);
                case models_1.VisitType.Profile:
                    return this._getForProfile(payload, options);
                default:
                    return {};
            }
        });
    }
    listForType(payload, options) {
        return __awaiter(this, void 0, void 0, function* () {
            if (lodash_1.default.isNil(payload))
                throw new errors_1.ParamsError.Missing("Missing valid payload.");
            if (!lodash_1.default.get(payload, "type") || !Object.values(models_1.VisitType).includes(lodash_1.default.get(payload, "type")))
                throw new errors_1.ParamsError.Invalid("Type missing or not supported.");
            if (!lodash_1.default.get(payload, "userId"))
                throw new errors_1.ParamsError.Missing("Missing owner.");
            switch (payload.type) {
                case models_1.VisitType.Network:
                    return this._listForNetworks(payload, options);
                case models_1.VisitType.Article:
                    return this._listForArticles(payload, options);
                default:
                    throw new errors_1.VisitError.NotFound("Type not supported");
                    return {};
            }
        });
    }
    /**
     *
     *
     * Specific Private - Utility Methods
     *
     *
     */
    _getForNetwork(payload, options) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = {
                type: models_1.VisitType.Network,
                targetId: payload.targetId,
            };
            if (!lodash_1.default.isNil(options)) {
                if (!lodash_1.default.isNil(options.from) && utils_1.isISODate(options.from))
                    query.createdAt = Object.assign(Object.assign({}, (query.createdAt || {})), { $gte: new Date(options.from) });
                if (!lodash_1.default.isNil(options.to) && utils_1.isISODate(options.to))
                    query.createdAt = Object.assign(Object.assign({}, (query.createdAt || {})), { $lte: new Date(options.to) });
            }
            const statistics = yield models_1.VisitModel.countDocuments(query);
            return {
                statistics,
                timeline: this._interpretTimeline(options),
            };
        });
    }
    _getForArticle(payload, options) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = {
                type: models_1.VisitType.Article,
                targetId: payload.targetId,
            };
            if (!lodash_1.default.isNil(options)) {
                if (!lodash_1.default.isNil(options.from) && utils_1.isISODate(options.from))
                    query.createdAt = Object.assign(Object.assign({}, (query.createdAt || {})), { $gte: new Date(options.from) });
                if (!lodash_1.default.isNil(options.to) && utils_1.isISODate(options.to))
                    query.createdAt = Object.assign(Object.assign({}, (query.createdAt || {})), { $lte: new Date(options.to) });
            }
            const statistics = yield models_1.VisitModel.countDocuments(query);
            return {
                statistics,
                timeline: this._interpretTimeline(options),
            };
        });
    }
    _getForProfile(payload, options) {
        return __awaiter(this, void 0, void 0, function* () {
            const aggregation = {
                $match: {
                    type: models_1.VisitType.Profile,
                    targetId: new mongodb_1.ObjectId(payload.userId),
                },
                $project: {
                    targetId: "$targetId",
                    date: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
                },
                $group: {
                    _id: "$date",
                    count: { $sum: 1 },
                },
                $sort: {
                    _id: 1,
                },
            };
            let isAll = true;
            if (!lodash_1.default.isNil(options)) {
                if (!lodash_1.default.isNil(options.from) && utils_1.isISODate(options.from)) {
                    aggregation.$match.createdAt = Object.assign(Object.assign({}, (aggregation.$match.createdAt || {})), { $gte: new Date(options.from) });
                    isAll = false;
                }
                if (!lodash_1.default.isNil(options.to) && utils_1.isISODate(options.to)) {
                    aggregation.$match.createdAt = Object.assign(Object.assign({}, (aggregation.$match.createdAt || {})), { $lte: new Date(options.to) });
                    isAll = false;
                }
            }
            const statistics = isAll
                ? [
                    {
                        _id: "All",
                        count: yield models_1.VisitModel.countDocuments({ type: models_1.VisitType.Profile, targetId: payload.userId }),
                    },
                ]
                : yield models_1.VisitModel.aggregate(Object.keys(aggregation).map(key => ({
                    [key]: aggregation[key],
                })));
            return {
                statistics,
                timeline: this._interpretTimeline(options),
            };
        });
    }
    _listForNetworks(payload, options) {
        return __awaiter(this, void 0, void 0, function* () {
            const aggregation = {
                $lookup: {
                    from: "networks",
                    localField: "targetId",
                    foreignField: "_id",
                    as: "networks",
                },
                $match: {
                    type: models_1.VisitType.Network,
                    networks: {
                        $elemMatch: {
                            user: new mongodb_1.ObjectId(payload.userId),
                        },
                    },
                },
                $group: {
                    _id: "$targetId",
                    count: { $sum: 1 },
                },
            };
            if (!lodash_1.default.isNil(options)) {
                if (!lodash_1.default.isNil(options.from) && utils_1.isISODate(options.from))
                    aggregation.$match.createdAt = Object.assign(Object.assign({}, (aggregation.$match.createdAt || {})), { $gte: new Date(options.from) });
                if (!lodash_1.default.isNil(options.to) && utils_1.isISODate(options.to))
                    aggregation.$match.createdAt = Object.assign(Object.assign({}, (aggregation.$match.createdAt || {})), { $lte: new Date(options.to) });
            }
            const statistics = yield models_1.VisitModel.aggregate(Object.keys(aggregation).map(key => ({
                [key]: aggregation[key],
            })));
            return {
                statistics,
                timeline: this._interpretTimeline(options),
            };
        });
    }
    _listForArticles(payload, options) {
        return __awaiter(this, void 0, void 0, function* () {
            const aggregation = {
                $lookup: {
                    from: "articles",
                    localField: "targetId",
                    foreignField: "_id",
                    as: "articles",
                },
                $match: {
                    type: models_1.VisitType.Article,
                    articles: {
                        $elemMatch: {
                            user: new mongodb_1.ObjectId(payload.userId),
                        },
                    },
                },
                $group: {
                    _id: "$targetId",
                    count: { $sum: 1 },
                },
            };
            if (!lodash_1.default.isNil(options)) {
                if (!lodash_1.default.isNil(options.from) && utils_1.isISODate(options.from))
                    aggregation.$match.createdAt = Object.assign(Object.assign({}, (aggregation.$match.createdAt || {})), { $gte: new Date(options.from) });
                if (!lodash_1.default.isNil(options.to) && utils_1.isISODate(options.to))
                    aggregation.$match.createdAt = Object.assign(Object.assign({}, (aggregation.$match.createdAt || {})), { $lte: new Date(options.to) });
            }
            const statistics = yield models_1.VisitModel.aggregate(Object.keys(aggregation).map(key => ({
                [key]: aggregation[key],
            })));
            return {
                statistics,
                timeline: this._interpretTimeline(options),
            };
        });
    }
    _populateByOptions(options) {
        const population = [];
        if (lodash_1.default.isNil(options) || !lodash_1.default.get(options, "populate"))
            return population;
        return population;
    }
    _formatByOptions(options) {
        const format = { sort: { priority: -1 } };
        if (lodash_1.default.isNil(options))
            return format;
        if (!lodash_1.default.isNil(options.limit)) {
            const limit = lodash_1.default.attempt(() => lodash_1.default.toNumber(options.limit));
            if (!lodash_1.default.isError(limit))
                format.limit = limit;
        }
        if (!lodash_1.default.isNil(options.offset)) {
            const offset = lodash_1.default.attempt(() => lodash_1.default.toNumber(options.offset));
            if (!lodash_1.default.isError(offset))
                format.offset = offset;
        }
        return format;
    }
    _interpretTimeline(options) {
        const timeline = {
            from: "creation",
            to: "now",
        };
        if (!lodash_1.default.isNil(options)) {
            if (!lodash_1.default.isNil(options.from) && utils_1.isISODate(options.from))
                timeline.from = options.from;
            if (!lodash_1.default.isNil(options.to) && utils_1.isISODate(options.to))
                timeline.to = options.to;
        }
        return timeline;
    }
}
exports.default = VisitRepository;
