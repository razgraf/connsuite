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
const connsuite_guards_1 = __importDefault(require("@razgraf/connsuite-guards"));
const typegoose_1 = require("@typegoose/typegoose");
const base_1 = __importDefault(require("./base"));
const user_1 = __importDefault(require("./user"));
const image_1 = __importDefault(require("./image"));
const constants_1 = require("../constants");
const models_1 = require("../models");
const errors_1 = require("../errors");
class NetworkRepository extends base_1.default {
    static getInstance() {
        return NetworkRepository.instance || (NetworkRepository.instance = new NetworkRepository());
    }
    getById(id, options) {
        return __awaiter(this, void 0, void 0, function* () {
            if (options && options.populate)
                return models_1.NetworkModel.findOne({ _id: id }).populate(this._populateByOptions(options));
            return models_1.NetworkModel.findById(id);
        });
    }
    create(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            if (lodash_1.default.isNil(payload) || !lodash_1.default.get(payload, "user"))
                throw new errors_1.AuthError.Forbidden("Missing user configuration (server side).");
            if (!lodash_1.default.get(payload, "type"))
                throw new errors_1.ParamsError.Missing("Missing Type");
            if (payload.type === models_1.NetworkType.Internal) {
                yield this._internalGuards(payload, "create");
                return this._createInternal(payload);
            }
            else if (payload.type === models_1.NetworkType.External) {
                yield this._externalGuards(payload, "create");
                return this._createExternal(payload);
            }
            else
                throw new errors_1.ParamsError.Invalid("Network type not supported.");
        });
    }
    update(id, payload) {
        return __awaiter(this, void 0, void 0, function* () {
            if (lodash_1.default.isNil(payload) || !lodash_1.default.get(payload, "user"))
                throw new errors_1.AuthError.Forbidden("Missing user configuration (server side).");
            const holder = yield this.getByFilters({ _id: id, user: payload.user }, { populate: true });
            if (!holder)
                throw new errors_1.NetworkError.NotFound("Unknown network or access not granted.");
            payload.type = holder.type;
            if (payload.type === models_1.NetworkType.Internal) {
                yield this._internalGuards(payload, "update");
                return this._updateInternal(holder, payload);
            }
            else if (payload.type === models_1.NetworkType.External) {
                yield this._externalGuards(payload, "update");
                return this._updateExternal(holder, payload);
            }
            throw new errors_1.ParamsError.Invalid("Network type not supported.");
        });
    }
    /**
     *
     * @param {string} id - the id of the soon to be removed network
     * Use this iteration of remove() only by admin demand. For user demands, use @method removeFromUser() as it checks for ownership
     */
    remove(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield models_1.NetworkModel.findByIdAndRemove(id);
        });
    }
    list(filters, options) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!lodash_1.default.isNil(options))
                return models_1.NetworkModel.find(filters, null, this._formatByOptions(options)).populate(this._populateByOptions(options));
            return models_1.NetworkModel.find(filters, null, this._formatByOptions(options)) || [];
        });
    }
    /**
     *
     *
     * Specific Public Methods
     *
     *
     */
    getByFilters(filters, options) {
        return __awaiter(this, void 0, void 0, function* () {
            if (options && options.populate)
                return models_1.NetworkModel.findOne(filters)
                    .populate({ path: "icon", model: "Image" })
                    .populate({ path: "thumbnail", model: "Image" });
            return models_1.NetworkModel.findOne(filters);
        });
    }
    removeFromUser(networkId, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const network = yield this.getByFilters({ _id: networkId, user: userId }, { populate: true });
                if (!network)
                    throw new Error("Unknown network");
                this._removeImages(network);
                this._removeUserBond(network);
                yield this.remove(networkId);
            }
            catch (error) {
                console.error(error);
                throw new errors_1.NetworkError.NotFound("Couldn't find network to remove or access is forbidden for this user-network pair.");
            }
        });
    }
    bindImage(networkId, payload) {
        return __awaiter(this, void 0, void 0, function* () {
            yield models_1.NetworkModel.findByIdAndUpdate(networkId, payload);
        });
    }
    /**
     *
     *
     * Specific Private - Utility Methods
     *
     *
     */
    _bind(network) {
        return __awaiter(this, void 0, void 0, function* () {
            yield user_1.default.getInstance().addNetwork(String(network._id), String(network.user));
        });
    }
    _removeUserBond(network) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!lodash_1.default.isNil(network.user)) {
                user_1.default.getInstance().removeNetwork(String(network._id), String(network.user));
            }
        });
    }
    _generateImages(source, network) {
        return __awaiter(this, void 0, void 0, function* () {
            const specimen = {
                parent: models_1.ImageParent.Network,
                purpose: models_1.ImagePurpose.Icon,
                network,
                type: source.mimetype,
            };
            yield image_1.default.getInstance().save(source, specimen);
            yield image_1.default.getInstance().save(source, Object.assign(Object.assign({}, specimen), { purpose: models_1.ImagePurpose.Thumbnail }));
        });
    }
    _removeImages(network) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (network.type === models_1.NetworkType.Internal) {
                    if (!lodash_1.default.isNil(network.icon) && typegoose_1.isDocument(network.icon)) {
                        yield image_1.default.getInstance().remove(network.icon._id);
                        image_1.default.getInstance().unlink(network.icon);
                    }
                    if (!lodash_1.default.isNil(network.thumbnail) && typegoose_1.isDocument(network.thumbnail)) {
                        yield image_1.default.getInstance().remove(network.thumbnail._id);
                        image_1.default.getInstance().unlink(network.thumbnail);
                    }
                }
            }
            catch (e) {
                console.error(e);
            }
        });
    }
    _populateByOptions(options) {
        const population = [];
        if (lodash_1.default.isNil(options) || !lodash_1.default.get(options, "populate"))
            return population;
        if (!options.hideImages)
            population.push({ path: "icon", model: "Image" }, { path: "thumbnail", model: "Image" });
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
    /**
     *
     *
     * Specific Private - Utility Methods: Update
     *
     *
     */
    _updateInternal(holder, payload) {
        return __awaiter(this, void 0, void 0, function* () {
            const network = yield models_1.NetworkModel.findByIdAndUpdate(holder._id, {
                title: payload.title,
                username: payload.title,
                description: payload.description,
            });
            if (!lodash_1.default.isNil(payload.icon)) {
                yield this._removeImages(holder);
                yield this._generateImages(payload.icon, holder);
            }
            return network;
        });
    }
    _updateExternal(holder, payload) {
        return __awaiter(this, void 0, void 0, function* () {
            const network = yield models_1.NetworkModel.findByIdAndUpdate(holder._id, {
                username: payload.username,
                description: payload.description,
            });
            return network;
        });
    }
    /**
     *
     *
     * Specific Private - Utility Methods: Create & Create/Update Guards
     *
     *
     */
    _createInternal(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            const specimen = lodash_1.default.cloneDeep(payload);
            delete specimen.externalId;
            delete specimen.icon;
            delete specimen.thumbnail;
            /**
             * Create the network object and gain access to the _id
             */
            const network = yield models_1.NetworkModel.create(specimen);
            if (!network)
                throw new errors_1.NetworkError.Failed("Network couldn't be created.");
            yield this._bind(network);
            yield this._generateImages(payload.icon, network);
            return network;
        });
    }
    _createExternal(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            const specimen = lodash_1.default.cloneDeep(payload);
            delete specimen.title;
            delete specimen.url;
            delete specimen.icon;
            delete specimen.thumbnail;
            const network = yield models_1.NetworkModel.create(specimen);
            if (!network)
                throw new errors_1.NetworkError.Failed("Network couldn't be created.");
            yield this._bind(network);
            return network;
        });
    }
    _internalGuards(payload, type = "create") {
        return __awaiter(this, void 0, void 0, function* () {
            if (type === "create" || (type === "update" && !lodash_1.default.isNil(payload.icon))) {
                if (!lodash_1.default.get(payload, "icon"))
                    throw new errors_1.ParamsError.Missing("Missing icon or wrong icon size & type.");
                const iconGuard = connsuite_guards_1.default.isNetworkIconAcceptable(lodash_1.default.get(payload, "icon"), true, { vendor: "multer" });
                if (iconGuard !== true)
                    throw new errors_1.ParamsError.Invalid(iconGuard);
            }
            if (!lodash_1.default.get(payload, "title"))
                throw new errors_1.ParamsError.Missing("Missing Title");
            const titleGuard = connsuite_guards_1.default.isNetworkTitleAcceptable(payload.title, true);
            if (titleGuard !== true)
                throw new errors_1.ParamsError.Invalid(titleGuard);
            if (!lodash_1.default.get(payload, "url"))
                throw new errors_1.ParamsError.Missing("Missing Url");
            const urlGuard = connsuite_guards_1.default.isNetworkUrlAcceptable(payload.url, true);
            if (urlGuard !== true)
                throw new errors_1.ParamsError.Invalid(urlGuard);
            if (lodash_1.default.get(payload, "username")) {
                const usernameGuard = connsuite_guards_1.default.isNetworkUsernameAcceptable(payload.username || "", true);
                if (usernameGuard !== true)
                    throw new errors_1.ParamsError.Invalid(usernameGuard);
            }
            if (lodash_1.default.get(payload, "description")) {
                const descriptionGuard = connsuite_guards_1.default.isNetworkDescriptionsAcceptable(payload.description || "", true);
                if (descriptionGuard !== true)
                    throw new errors_1.ParamsError.Invalid(descriptionGuard);
            }
        });
    }
    _externalGuards(payload, type = "create") {
        return __awaiter(this, void 0, void 0, function* () {
            if (type === "create") {
                if (!lodash_1.default.get(payload, "externalId"))
                    throw new errors_1.ParamsError.Missing("Missing External Network");
                const externalIdGuard = connsuite_guards_1.default.isNetworkExternalIdAcceptable(payload.externalId, true, constants_1.networks);
                if (externalIdGuard !== true)
                    throw new errors_1.ParamsError.Invalid(externalIdGuard);
            }
            if (!lodash_1.default.get(payload, "username"))
                throw new errors_1.ParamsError.Missing("Missing Username");
            const usernameGuard = connsuite_guards_1.default.isNetworkUsernameAcceptable(payload.username, true);
            if (usernameGuard !== true)
                throw new errors_1.ParamsError.Invalid(usernameGuard);
            if (lodash_1.default.get(payload, "description")) {
                const descriptionGuard = connsuite_guards_1.default.isNetworkDescriptionsAcceptable(payload.description || "", true);
                if (descriptionGuard !== true)
                    throw new errors_1.ParamsError.Invalid(descriptionGuard);
            }
        });
    }
}
exports.default = NetworkRepository;
