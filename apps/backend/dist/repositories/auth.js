"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const connsuite_guards_1 = __importStar(require("@razgraf/connsuite-guards"));
const username_1 = __importDefault(require("./username"));
const user_1 = __importDefault(require("./user"));
const usersafe_1 = __importDefault(require("./usersafe"));
const token_1 = __importDefault(require("./token"));
const vendors_1 = require("../vendors");
const base_1 = require("./base");
const errors_1 = require("../errors");
const models_1 = require("../models");
class AuthRepository extends base_1.ManagerRepository {
    static getInstance() {
        return AuthRepository.instance || (AuthRepository.instance = new AuthRepository());
    }
    google(body) {
        return __awaiter(this, void 0, void 0, function* () {
            if (lodash_1.default.isNil(body) || !lodash_1.default.get(body, "identity"))
                throw new errors_1.ParamsError.Missing("Google Auth Token");
            const ticket = yield vendors_1.google.getTicket(body.identity);
            if (lodash_1.default.isNil(ticket))
                throw new errors_1.AuthError.MissingVendorResponse("Google Ticket");
            const payload = ticket.getPayload();
            if (lodash_1.default.isNil(payload))
                throw new errors_1.AuthError.MissingVendorResponse("Google Payload");
            if (!lodash_1.default.get(payload, "sub"))
                throw new errors_1.AuthError.MissingVendorResponse("Google Id");
            if (!lodash_1.default.get(payload, "given_name"))
                throw new errors_1.AuthError.MissingVendorResponse("Google First Name");
            if (!lodash_1.default.get(payload, "family_name"))
                throw new errors_1.AuthError.MissingVendorResponse("Google Last Name");
            if (!lodash_1.default.get(payload, "email"))
                throw new errors_1.AuthError.MissingVendorResponse("Google Email");
            let user;
            const googleData = {
                googleId: String(payload.sub),
                firstName: payload.given_name || "",
                lastName: payload.family_name || "",
                picture: payload.picture,
                email: payload.email || "",
                agent: body.agent,
            };
            if (!(yield user_1.default.getInstance().isAlreadyRegistered(googleData, models_1.Vendor.GOOGLE))) {
                if (yield user_1.default.getInstance().isAlreadyRegistered(googleData, models_1.Vendor.CLASSIC))
                    throw new errors_1.AuthError.Failed("This email is already used by an account with classic password registration.");
                user = (yield user_1.default.getInstance().createFromGoogle(googleData));
            }
            else
                user = (yield user_1.default.getInstance().getByGoogleId(googleData.googleId, { populate: true }));
            if (!user)
                throw new errors_1.AuthError.Failed("Could not create an account with Google. Try another method.");
            const safe = yield token_1.default.getInstance().generateToken(user, body.agent);
            return {
                token: safe,
                user,
            };
        });
    }
    register(body) {
        return __awaiter(this, void 0, void 0, function* () {
            if (lodash_1.default.isNil(body))
                throw new errors_1.ParamsError.Missing("All");
            if (!lodash_1.default.get(body, "firstName"))
                throw new errors_1.ParamsError.Missing("Missing First Name.");
            if (!lodash_1.default.get(body, "lastName"))
                throw new errors_1.ParamsError.Missing("Missing Last Name.");
            if (!lodash_1.default.get(body, "email"))
                throw new errors_1.ParamsError.Missing("Missing Email.");
            if (!lodash_1.default.get(body, "password"))
                throw new errors_1.ParamsError.Missing("Missing Password.");
            if (!lodash_1.default.get(body, "username"))
                throw new errors_1.ParamsError.Missing("Missing Username.");
            if (!connsuite_guards_1.default.isNameAcceptable(body.firstName, false))
                throw new errors_1.ParamsError.Invalid(connsuite_guards_1.policy.user.name.root);
            if (!connsuite_guards_1.default.isNameAcceptable(body.lastName, false))
                throw new errors_1.ParamsError.Invalid(connsuite_guards_1.policy.user.name.root);
            if (!connsuite_guards_1.default.isUsernameAcceptable(body.username, false))
                throw new errors_1.ParamsError.Invalid(connsuite_guards_1.policy.user.username.root);
            if (!connsuite_guards_1.default.isEmailAcceptable(body.email, false))
                throw new errors_1.ParamsError.Invalid(connsuite_guards_1.policy.user.email.root);
            if (!connsuite_guards_1.default.isPasswordAcceptable(body.password, false))
                throw new errors_1.ParamsError.Invalid(connsuite_guards_1.policy.user.password.root);
            const isAlreadyRegistered = yield user_1.default.getInstance().isAlreadyRegistered(body, models_1.Vendor.CLASSIC);
            if (isAlreadyRegistered)
                throw new errors_1.ParamsError.Conflict(`The email ${body.email} is already linked to an account`);
            const isUsernameTaken = (yield username_1.default.getInstance().getByValue(body.username)) !== null;
            if (isUsernameTaken)
                throw new errors_1.ParamsError.Conflict(`The username ${body.username} is already used by someone.`);
            const user = (yield user_1.default.getInstance().createFromClassic(body));
            if (!user)
                throw new errors_1.AuthError.Failed("Could not create a new account. Please try again.");
            const safe = yield token_1.default.getInstance().generateToken(user, body.agent);
            return {
                token: safe,
                user,
            };
        });
    }
    login(body) {
        return __awaiter(this, void 0, void 0, function* () {
            if (lodash_1.default.isNil(body))
                throw new errors_1.ParamsError.Missing("No parameteres have been provided.");
            if (!lodash_1.default.get(body, "email"))
                throw new errors_1.ParamsError.Missing("Missing Email.");
            if (!lodash_1.default.get(body, "password"))
                throw new errors_1.ParamsError.Missing("Missing Password.");
            if (!connsuite_guards_1.default.isEmailAcceptable(body.email, false))
                throw new errors_1.ParamsError.Invalid(connsuite_guards_1.policy.user.email.root);
            if (!connsuite_guards_1.default.isPasswordAcceptable(body.password, false))
                throw new errors_1.ParamsError.Invalid(connsuite_guards_1.policy.user.password.root);
            const user = (yield user_1.default.getInstance().getByEmail(body.email, { populate: true }));
            if (!user)
                throw new errors_1.AuthError.UserNotFound("This email doesn't belong to any of our users.");
            if (!user.password)
                throw new errors_1.AuthError.UserNotFound("This account was created with a provider (e.g. Google). Try again with that provider.");
            if (!(yield user_1.default.getInstance().isPasswordMatching(user, body.password)))
                throw new errors_1.AuthError.UserNotFound("Email and password do not match. Please try again.");
            const safe = yield token_1.default.getInstance().generateToken(user, body.agent);
            return {
                token: safe,
                user,
            };
        });
    }
    validate(token) {
        return __awaiter(this, void 0, void 0, function* () {
            const payload = yield token_1.default.getInstance().verifyToken(token);
            if (!payload)
                throw new errors_1.AuthError.InvalidToken("Unreachable payload.");
            // JWT integrity gate passed
            const usersafe = {
                user: new mongodb_1.ObjectId(payload.userId),
                safe: payload.safe,
            };
            const entry = yield usersafe_1.default.getInstance().getByUserAndSafe(usersafe);
            if (!entry) {
                usersafe_1.default.getInstance().removeByUserAndSafe(usersafe);
                throw new errors_1.AuthError.InvalidToken("Unauthorized based on Bearer payload.");
            }
            // User-Safe match gate passed
            return usersafe;
        });
    }
    logout(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            return usersafe_1.default.getInstance().removeByUserAndSafe(payload);
        });
    }
}
exports.default = AuthRepository;
