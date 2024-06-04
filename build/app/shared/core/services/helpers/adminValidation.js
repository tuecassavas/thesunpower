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
exports.adminValidation = void 0;
const phoneHelper_1 = require("../../../helpers/phoneHelper");
const logError_1 = require("../../error/logError");
const errorVars_1 = require("../../error/errorVars");
const rGetAdmin_1 = require("shared/core/repo/Admin/rGetAdmin");
const adminValidation = (username) => __awaiter(void 0, void 0, void 0, function* () {
    username = (0, phoneHelper_1.prettierPhoneNumber)(username);
    const user = yield (0, rGetAdmin_1.rGetAdmin)(username);
    if (!user) {
        throw new logError_1.LogError(errorVars_1.ErrorVars.E002_USER_NOT_EXISTS, 'LOGIC');
    }
    if (user.isBlocked) {
        throw new logError_1.LogError(errorVars_1.ErrorVars.E012_USER_IS_BLOCKED, 'LOGIC');
    }
    return user;
});
exports.adminValidation = adminValidation;
