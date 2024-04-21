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
exports.sSetPassword = exports.sVerifyForgotPasswordToken = exports.sRequestForgotPassword = void 0;
const logError_1 = require("../../error/logError");
const errorVars_1 = require("../../error/errorVars");
const sSendToken_1 = require("shared/core/services/Sender/sSendToken");
const sVerifyOTP_1 = require("shared/core/services/Sender/sVerifyOTP");
const rUpdateUserPassword_1 = require("../../repo/Auth/rUpdateUserPassword");
const userValidation_1 = require("shared/core/services/helpers/userValidation");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const process_1 = __importDefault(require("process"));
const sRequestForgotPassword = (username) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, sSendToken_1.sSendToken)(username, 'FORGOT');
});
exports.sRequestForgotPassword = sRequestForgotPassword;
const sVerifyForgotPasswordToken = (username, otp) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const user = yield (0, userValidation_1.userValidation)(username);
    yield (0, sVerifyOTP_1.sVerifyOTP)(username, otp, 'FORGOT');
    return jsonwebtoken_1.default.sign({
        id: user.id,
        username: user.username
    }, (_a = process_1.default.env.RESET_PASSWORD_TOKEN) !== null && _a !== void 0 ? _a : '', { expiresIn: '5m' });
});
exports.sVerifyForgotPasswordToken = sVerifyForgotPasswordToken;
const sSetPassword = (password, token) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    try {
        const payload = jsonwebtoken_1.default.verify(token, (_b = process_1.default.env.RESET_PASSWORD_TOKEN) !== null && _b !== void 0 ? _b : '');
        yield (0, rUpdateUserPassword_1.rUpdateUserPassword)(payload.username, password);
    }
    catch (e) {
        throw new logError_1.LogError(errorVars_1.ErrorVars.E010_TOKEN_EXPIRED, 'LOGIC');
    }
});
exports.sSetPassword = sSetPassword;
