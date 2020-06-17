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
const bcrypt_1 = __importDefault(require("bcrypt"));
const mongodb_1 = require("mongodb");
const connsuite_guards_1 = __importDefault(require("@razgraf/connsuite-guards"));
const typegoose_1 = require("@typegoose/typegoose");
const base_1 = __importDefault(require("./base"));
const username_1 = __importDefault(require("./username"));
const constants_1 = require("../constants");
const errors_1 = require("../errors");
const models_1 = require("../models");
const _1 = require(".");
class UserRepository extends base_1.default {
    static getInstance() {
        return UserRepository.instance || (UserRepository.instance = new UserRepository());
    }
    getById(id, options) {
        return __awaiter(this, void 0, void 0, function* () {
            if (options && options.populate)
                return models_1.UserModel.findOne({ _id: id }).populate(this._populateByOptions(options));
            return models_1.UserModel.findOne({ _id: id });
        });
    }
    create(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            return models_1.UserModel.create(payload);
        });
    }
    update(id, payload) {
        return __awaiter(this, void 0, void 0, function* () {
            if (lodash_1.default.isNil(payload))
                throw new errors_1.ParamsError.Missing("No payload provided.");
            if (!lodash_1.default.get(payload, "userId"))
                throw new errors_1.ParamsError.Missing("No user provided.");
            if (!lodash_1.default.get(payload, "firstName"))
                throw new errors_1.ParamsError.Missing("Missing first name");
            if (!lodash_1.default.get(payload, "lastName"))
                throw new errors_1.ParamsError.Missing("Missing last name");
            if (!lodash_1.default.get(payload, "description"))
                throw new errors_1.ParamsError.Missing("Missing Description");
            if (!lodash_1.default.get(payload, "tagline"))
                throw new errors_1.ParamsError.Missing("Missing Tagline");
            const holder = yield this.getById(lodash_1.default.get(payload, "userId"), { populate: true });
            if (!holder)
                throw new errors_1.AuthError.UserNotFound("Unknown user or access not granted.");
            yield this._profileGuards(payload, holder);
            const user = yield models_1.UserModel.findByIdAndUpdate(holder._id, {
                name: {
                    first: payload.firstName,
                    last: payload.lastName,
                },
                description: payload.description,
                tagline: payload.tagline,
                calendly: lodash_1.default.get(payload, "calendly"),
            });
            if (!lodash_1.default.isNil(payload.picture)) {
                yield this._removeImages(holder);
                yield this._generateImages(payload.picture, holder);
            }
            return user;
        });
    }
    remove(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield models_1.UserModel.findByIdAndRemove(id);
        });
    }
    list(filters) {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield models_1.UserModel.find(filters)) || [];
        });
    }
    /**
     *
     *
     * Specific Public Methods
     *
     *
     */
    getByEmail(email, options) {
        return __awaiter(this, void 0, void 0, function* () {
            if (options && options.populate)
                return models_1.UserModel.findOne({ email }).populate(this._populateByOptions(options));
            return yield models_1.UserModel.findOne({ email });
        });
    }
    getByGoogleId(googleId, options) {
        return __awaiter(this, void 0, void 0, function* () {
            if (options && options.populate)
                return models_1.UserModel.findOne({ googleId }).populate(this._populateByOptions(options));
            return yield models_1.UserModel.findOne({ googleId });
        });
    }
    getByUsername(username, options) {
        return __awaiter(this, void 0, void 0, function* () {
            const found = (yield username_1.default.getInstance().getByValue(username));
            if (!found || !found.user)
                return null;
            if (options && options.populate)
                return models_1.UserModel.findById(found.user).populate(this._populateByOptions(options));
            return yield models_1.UserModel.findById(found.user);
        });
    }
    getIdByUsername(username) {
        return __awaiter(this, void 0, void 0, function* () {
            const found = (yield username_1.default.getInstance().getByValue(username));
            return !found || !found.user ? null : String(found.user);
        });
    }
    interpretIdentifierToId(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            if (lodash_1.default.isNil(payload))
                return null;
            try {
                if (String(payload._id) === String(new mongodb_1.ObjectId(payload._id)))
                    return String(payload._id);
            }
            catch (e) { } //eslint-disable-line
            if (!lodash_1.default.isNil(payload.username)) {
                const id = yield this.getIdByUsername(payload.username || "");
                if (!id)
                    return null;
                return String(id);
            }
            if (!lodash_1.default.isNil(payload.email)) {
                const user = (yield this.getByEmail(payload.email || ""));
                if (!user || lodash_1.default.isNil(user._id))
                    return null;
                return String(user._id);
            }
            return null;
        });
    }
    interpretIdOrUsernameToId(identifier) {
        return __awaiter(this, void 0, void 0, function* () {
            if (lodash_1.default.isNil(identifier))
                return null;
            try {
                if (String(identifier) === String(new mongodb_1.ObjectId(identifier)))
                    return String(identifier);
            }
            catch (e) { } //eslint-disable-line
            const id = yield this.getIdByUsername(identifier);
            if (!id)
                return null;
            return String(id);
        });
    }
    addUsername(userId, usernameId) {
        return __awaiter(this, void 0, void 0, function* () {
            yield models_1.UserModel.findByIdAndUpdate(userId, { $push: { usernames: new mongodb_1.ObjectId(usernameId) } }, { upsert: true });
        });
    }
    addNetwork(networkId, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            yield models_1.UserModel.findByIdAndUpdate(userId, { $push: { networks: new mongodb_1.ObjectId(networkId) } }, { upsert: true });
        });
    }
    removeNetwork(networkId, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            yield models_1.UserModel.findByIdAndUpdate(userId, { $pull: { networks: new mongodb_1.ObjectId(networkId) } });
        });
    }
    addArticle(articleId, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            yield models_1.UserModel.findByIdAndUpdate(userId, { $push: { articles: new mongodb_1.ObjectId(articleId) } }, { upsert: true });
        });
    }
    removeArticle(articleId, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            yield models_1.UserModel.findByIdAndUpdate(userId, { $pull: { articles: new mongodb_1.ObjectId(articleId) } });
        });
    }
    isAlreadyRegistered(payload, vendor) {
        return __awaiter(this, void 0, void 0, function* () {
            if (vendor === models_1.Vendor.GOOGLE) {
                const googleId = lodash_1.default.get(payload, "googleId");
                if (!googleId)
                    return false;
                const user = yield this.getByGoogleId(googleId);
                return user ? true : false;
            }
            else if (vendor === models_1.Vendor.CLASSIC) {
                const email = lodash_1.default.get(payload, "email");
                if (!email)
                    return false;
                const user = yield this.getByEmail(email);
                return user ? true : false;
            }
            return false;
        });
    }
    isPasswordMatching(user, clear) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!lodash_1.default.get(user, "password"))
                return false;
            return this._comparePassword(clear, user.password || "");
        });
    }
    /**
     * Create a user from the Google object
     * [!] - Run a conflict check for username uniqueness prior to creating the user
     *
     * @param payload Google object containint the base user information
     */
    createFromGoogle(payload) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const name = {
                first: payload.firstName,
                last: payload.lastName,
            };
            const user = yield UserRepository.getInstance().create({
                name,
                email: payload.email,
                description: constants_1.defaults.description,
                tagline: constants_1.defaults.tagline,
                googleId: payload.googleId,
            });
            const value = (yield username_1.default.getInstance().generateFromName(name)) || constants_1.defaults.username;
            const username = yield username_1.default.getInstance().create({
                isPrimary: true,
                user,
                value,
            });
            (_a = user.usernames) === null || _a === void 0 ? void 0 : _a.push(username);
            return user;
        });
    }
    /**
     * Create a user from the Google object
     * [!] - Run a conflict check for username uniqueness prior to creating the user
     *
     * @param payload Google object containint the base user information
     */
    createFromClassic(payload) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const password = this._hashPassword(payload.password);
            const name = {
                first: payload.firstName,
                last: payload.lastName,
            };
            const user = yield UserRepository.getInstance().create({
                name,
                email: payload.email,
                description: constants_1.defaults.description,
                tagline: constants_1.defaults.tagline,
                password,
            });
            const value = payload.username || constants_1.defaults.username;
            const username = yield username_1.default.getInstance().create({
                isPrimary: true,
                user,
                value,
            }, { alter: false });
            (_a = user.usernames) === null || _a === void 0 ? void 0 : _a.push(username);
            return user;
        });
    }
    bindImage(userId, payload) {
        return __awaiter(this, void 0, void 0, function* () {
            yield models_1.UserModel.findByIdAndUpdate(userId, payload);
        });
    }
    /**
     *
     *
     * Specific Private - Utility Methods
     *
     *
     */
    _profileGuards(payload, historic) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!lodash_1.default.get(payload, "firstName"))
                throw new errors_1.ParamsError.Missing("Missing first name.");
            const firstNameGuard = connsuite_guards_1.default.isNameAcceptable(lodash_1.default.get(payload, "firstName"), true);
            if (firstNameGuard !== true)
                throw new errors_1.ParamsError.Invalid(("First Name: " + firstNameGuard));
            if (!lodash_1.default.get(payload, "lastName"))
                throw new errors_1.ParamsError.Missing("Missing last name.");
            const lastNameGuard = connsuite_guards_1.default.isNameAcceptable(lodash_1.default.get(payload, "lastName"), true);
            if (lastNameGuard !== true)
                throw new errors_1.ParamsError.Invalid(("Last Name: " + lastNameGuard));
            if (!lodash_1.default.get(payload, "description"))
                throw new errors_1.ParamsError.Missing("Missing Description");
            const descriptionGuard = connsuite_guards_1.default.isUserDescriptionAcceptable(lodash_1.default.get(payload, "description"), true);
            if (descriptionGuard !== true)
                throw new errors_1.ParamsError.Invalid(("Description: " + descriptionGuard));
            if (!lodash_1.default.get(payload, "tagline"))
                throw new errors_1.ParamsError.Missing("Missing Tagline");
            const taglineGuard = connsuite_guards_1.default.isUserDescriptionAcceptable(lodash_1.default.get(payload, "tagline"), true);
            if (taglineGuard !== true)
                throw new errors_1.ParamsError.Invalid(("Tagline: " + taglineGuard));
            /** If there is no picture historically-available (e.g. fresh user), don't update until the user uploads one */
            if (!lodash_1.default.get(historic, "picture") ||
                !lodash_1.default.get(historic, "picture._id") ||
                !lodash_1.default.get(historic, "thumbnail") ||
                !lodash_1.default.get(historic, "thumbnail._id")) {
                if (!lodash_1.default.get(payload, "picture") || !payload.picture)
                    throw new errors_1.ParamsError.Missing("Missing Picture");
                const pictureGuard = connsuite_guards_1.default.isUserPictureAcceptable(payload.picture, true, { vendor: "multer" });
                if (pictureGuard !== true)
                    throw new errors_1.ParamsError.Invalid(pictureGuard);
            }
            if (lodash_1.default.get(payload, "calendly")) {
                const calendlyGuard = connsuite_guards_1.default.isUserCalendlyAcceptable(lodash_1.default.toString(lodash_1.default.get(payload, "calendly")), true);
                if (calendlyGuard !== true)
                    throw new errors_1.ParamsError.Invalid(("Calendly: " + calendlyGuard));
            }
        });
    }
    _removeImages(user) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!lodash_1.default.isNil(user.picture) && typegoose_1.isDocument(user.picture)) {
                    yield _1.ImageRepository.getInstance().remove(user.picture._id);
                    _1.ImageRepository.getInstance().unlink(user.picture);
                }
                if (!lodash_1.default.isNil(user.thumbnail) && typegoose_1.isDocument(user.thumbnail)) {
                    yield _1.ImageRepository.getInstance().remove(user.thumbnail._id);
                    _1.ImageRepository.getInstance().unlink(user.thumbnail);
                }
            }
            catch (e) {
                console.error(e);
            }
        });
    }
    _generateImages(source, user) {
        return __awaiter(this, void 0, void 0, function* () {
            const specimen = {
                parent: models_1.ImageParent.User,
                purpose: models_1.ImagePurpose.Cover,
                user,
                type: source.mimetype,
            };
            yield _1.ImageRepository.getInstance().save(source, specimen);
            yield _1.ImageRepository.getInstance().save(source, Object.assign(Object.assign({}, specimen), { purpose: models_1.ImagePurpose.Thumbnail }));
        });
    }
    _populateByOptions(options) {
        const population = [];
        if (lodash_1.default.isNil(options) || !lodash_1.default.get(options, "populate"))
            return population;
        if (!options.hideUsernames)
            population.push({ path: "usernames", model: "Username" });
        if (!options.hideImages)
            population.push({ path: "picture", model: "Image" }, { path: "thumbnail", model: "Image" });
        return population;
    }
    _hashPassword(clear) {
        return bcrypt_1.default.hashSync(clear, 10);
    }
    _comparePassword(clear, hash) {
        return bcrypt_1.default.compareSync(clear, hash);
    }
}
exports.default = UserRepository;
