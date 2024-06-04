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
exports.sChangePassword = void 0;
const logError_1 = require("../../error/logError");
const errorVars_1 = require("../../error/errorVars");
const bcrypt_1 = __importDefault(require("bcrypt"));
const rUpdateUserPassword_1 = require("../../repo/Auth/rUpdateUserPassword");
const userValidation_1 = require("shared/core/services/helpers/userValidation");
const sChangePassword = (username, oldPassword, newPassword) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield (0, userValidation_1.userValidation)(username);
    if (!bcrypt_1.default.compareSync(oldPassword, user.password)) {
        throw new logError_1.LogError(errorVars_1.ErrorVars.E003_PASSWORD_NOT_CORRECT, 'LOGIC');
    }
    yield (0, rUpdateUserPassword_1.rUpdateUserPassword)(user.username, newPassword);
});
exports.sChangePassword = sChangePassword;
