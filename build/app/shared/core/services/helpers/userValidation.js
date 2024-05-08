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
exports.userValidation = void 0;
const emailHelper_1 = require("../../../helpers/emailHelper");
const phoneHelper_1 = require("../../../helpers/phoneHelper");
const rGetUser_1 = require("shared/core/repo/User/rGetUser");
const logError_1 = require("../../error/logError");
const errorVars_1 = require("../../error/errorVars");
const userValidation = (username) => __awaiter(void 0, void 0, void 0, function* () {
    if (!(0, emailHelper_1.emailValidation)(username)) {
        username = (0, phoneHelper_1.prettierPhoneNumber)(username);
    }
    const user = yield (0, rGetUser_1.rGetUserByUsername)(username);
    if (!user) {
        throw new logError_1.LogError(errorVars_1.ErrorVars.E002_USER_NOT_EXISTS, 'LOGIC');
    }
    if (!user.active) {
        throw new logError_1.LogError(errorVars_1.ErrorVars.E005_USER_PENDING, 'LOGIC');
    }
    if (user.isBlocked) {
        throw new logError_1.LogError(errorVars_1.ErrorVars.E012_USER_IS_BLOCKED, 'LOGIC');
    }
    if (user.deletedAt) {
        throw new logError_1.LogError(errorVars_1.ErrorVars.E013_USER_IS_DELETED, 'LOGIC');
    }
    return user;
});
exports.userValidation = userValidation;
