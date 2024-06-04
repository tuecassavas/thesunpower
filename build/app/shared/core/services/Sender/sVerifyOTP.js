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
exports.sVerifyOTP = void 0;
const rGetVerifyRequest_1 = require("../../repo/Auth/rGetVerifyRequest");
const phoneHelper_1 = require("../../../helpers/phoneHelper");
const logError_1 = require("../../error/logError");
const errorVars_1 = require("../../error/errorVars");
const rDeleteVerifyProcess_1 = require("../../repo/Auth/rDeleteVerifyProcess");
const sVerifyOTP = (username, otp, type) => __awaiter(void 0, void 0, void 0, function* () {
    let _username = username;
    if ((0, phoneHelper_1.phoneValidation)(username)) {
        _username = (0, phoneHelper_1.prettierPhoneNumber)(username);
    }
    const verifyRequest = yield (0, rGetVerifyRequest_1.rGetVerifyRequest)(_username);
    if (!verifyRequest) {
        throw new logError_1.LogError(errorVars_1.ErrorVars.E023_PROCESS_NOT_EXISTS, 'LOGIC');
    }
    if (verifyRequest.type !== type) {
        throw new logError_1.LogError(errorVars_1.ErrorVars.E023_PROCESS_NOT_EXISTS, 'LOGIC');
    }
    if (verifyRequest.numberOfSubmitOTP && verifyRequest.numberOfSendOTP > 3) {
        throw new logError_1.LogError(errorVars_1.ErrorVars.E018_LIMIT_VERIFY_OTP, 'LOGIC');
    }
    if (verifyRequest.numberOfSubmitOTP) {
        throw new logError_1.LogError(errorVars_1.ErrorVars.E024_OTP_EXPIRED, 'LOGIC');
    }
    if (verifyRequest.otp !== otp) {
        throw new logError_1.LogError(errorVars_1.ErrorVars.E006_OPT_INVALID, 'LOGIC');
    }
    yield (0, rDeleteVerifyProcess_1.rDeleteVerifyProcess)(_username);
    return true;
});
exports.sVerifyOTP = sVerifyOTP;
