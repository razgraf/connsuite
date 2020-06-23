"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserTier = exports.VisitType = void 0;
var VisitType;
(function (VisitType) {
    VisitType["Default"] = "default";
    VisitType["Network"] = "network";
    VisitType["Article"] = "article";
    VisitType["Profile"] = "profile";
    VisitType["BusinessCard"] = "businesscard";
})(VisitType = exports.VisitType || (exports.VisitType = {}));
var UserTier;
(function (UserTier) {
    UserTier[UserTier["Bronze"] = 5] = "Bronze";
    UserTier[UserTier["Silver"] = 10] = "Silver";
    UserTier[UserTier["Gold"] = 15] = "Gold";
    UserTier[UserTier["Platinum"] = 20] = "Platinum";
})(UserTier = exports.UserTier || (exports.UserTier = {}));
