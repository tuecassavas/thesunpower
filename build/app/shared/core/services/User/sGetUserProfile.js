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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sGetUserProfile = void 0;
const phoneHelper_1 = require("../../../helpers/phoneHelper");
const rGetUser_1 = require("shared/core/repo/User/rGetUser");
const logError_1 = require("../../error/logError");
const errorVars_1 = require("../../error/errorVars");
const sGetUserProfile = (username) => __awaiter(void 0, void 0, void 0, function* () {
    let _username = username;
    if ((0, phoneHelper_1.phoneValidation)(username)) {
        _username = (0, phoneHelper_1.prettierPhoneNumber)(username);
    }
    const user = yield (0, rGetUser_1.rGetUserByUsername)(_username);
    if (!user) {
        throw new logError_1.LogError(errorVars_1.ErrorVars.E002_USER_NOT_EXISTS, 'LOGIC');
    }
    if (user.isBlocked) {
        throw new logError_1.LogError(errorVars_1.ErrorVars.E012_USER_IS_BLOCKED, 'LOGIC');
    }
    if (user.deletedAt) {
        throw new logError_1.LogError(errorVars_1.ErrorVars.E013_USER_IS_DELETED, 'LOGIC');
    }
    if (!user.active) {
        throw new logError_1.LogError(errorVars_1.ErrorVars.E005_USER_PENDING, 'LOGIC');
    }
    const { password, active, isBlocked, deletedAt } = user, _user = __rest(user, ["password", "active", "isBlocked", "deletedAt"]);
    return _user;
});
exports.sGetUserProfile = sGetUserProfile;
